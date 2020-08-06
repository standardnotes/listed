# frozen_string_literal: true

namespace :ssl do
  desc 'Renews the letsencrypt certificates,
    re-imports them to AWS Certificate Manager and adds to the Load Balancer HTTPS listener'
  task :renew, [:aws_elb_listener_arn] => [:environment] do |_t, args|
    renewable_certificates = LetsEncrypt.certificate_model.renewable

    acm = Aws::ACM::Client.new
    elb = Aws::ElasticLoadBalancingV2::Client.new

    Rake::Task['letsencrypt:renew'].invoke

    renewable_certificates.each do |certificate|
      response = acm.import_certificate({
        certificate_arn: certificate.arn,
        certificate: certificate.certificate,
        private_key: certificate.key,
        certificate_chain: OpenSSL::X509::Certificate.new(certificate.bundle).to_pem
      })

      certificate.arn = response.certificate_arn
      certificate.save

      elb.add_listener_certificates({
        listener_arn: args[:aws_elb_listener_arn],
        certificates: [
          {
            certificate_arn: certificate.arn,
            is_default: false
          }
        ]
      })
    end
  end
end
