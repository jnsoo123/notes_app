class ApplicationController < ActionController::Base
  layout :layout_by_resource

  protect_from_forgery with: :exception

  include Pundit

  before_action :authenticate_user!

  protected

  def layout_by_resource
    devise_controller? ? 'devise' : 'application'
  end
end
