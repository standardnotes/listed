class CredentialsController < ApplicationController

  def new
    @credential = Credential.new
  end

  def create
    @credential = @author.credentials.new(credential_params)
    @credential.save
    redirect_to_authenticated_settings(@author)
  end

  def edit
    @credential = Credential.find(params[:id])
  end

  def update
    @credential = Credential.find(params[:id])
    @credential.update(credential_params)
    redirect_to_authenticated_settings(@author)
  end

  def destroy
    @credential = Credential.find(params[:id])
    @credential.destroy
    redirect_to_authenticated_settings(@author)
  end

  def credential_params
    params.require(:credential).permit(:key, :value)
  end

end
