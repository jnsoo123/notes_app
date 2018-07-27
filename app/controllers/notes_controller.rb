class NotesController < ApplicationController
  def index
    @notes = user_notes
  end

  def create
    @note = Note.new(note_params)
    @note.user = current_user
    @note.save

    render json: { success: true, notes: user_notes }
  end

  def destroy
    @note = Note.find(params[:id])
    @note.destroy

    render json: { success: true, notes: user_notes }
  end

  private

  def note_params
    params.require(:note).permit(:title, :body)
  end

  def user_notes
    current_user.notes.order(created_at: :desc)
  end
end
