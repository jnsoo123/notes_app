module Notes
  class SearchesController < ApplicationController
    def index
      notes = current_user.notes.ransack(params[:q]).result
      render json: { notes: notes }
    end
  end
end
