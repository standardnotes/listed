module SimpleCaptcha
  class SimpleCaptchaData < Sequel::Model
    plugin :update_or_create
    plugin :timestamps, update_on_create: true

    class << self
      def get_data(key)
        find_or_new(key: key)
      end

      def remove_data(key)
        where(key: key).delete
        clear_old_data(1.hour.ago)
      end

      def clear_old_data(time = 1.hour.ago)
        return unless Time === time
        where {updated_at < time}.delete
      end
    end
  end
end
