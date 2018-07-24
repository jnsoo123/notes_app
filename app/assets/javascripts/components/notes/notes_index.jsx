class NotesIndex extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {
      notes: this.props.notes.reverse()
    }
  }

  componentDidMount() {
    $('.notes-new__form').on('focusout', (event) => {
      let title = $('.notes-new__input')
      let text  = $('.notes-new__textarea')

      setTimeout(() => {
        if (!event.currentTarget.contains(document.activeElement)) {
          if (title.val().length && text.val().length) {
            console.log('save')
            this.createNote(title, text)
          }
        }
      }, 0)
    })
  }

  createNote(title, text) {
    $.ajax({
      method: 'POST',
      url: '/notes',
      data: {
        note: {
          title: title.val(),
          body: text.val()
        },
        authenticity_token: $('meta[name=csrf-token]').attr('content')
      },
      success: (response) => {
        this.setState({notes: response.notes.reverse()})
      },
      complete: () => {
        title.val('') 
        text.val('')
      }
    }) 
  }

  renderNotes() {
    return this.state.notes.map((note, i) => {
      return(
        <NotesItem key={i} note={note} />
      )
    })
  }

  renderNewNote() {
    return(<div className='col-md-4 mt-3'>
      <div className='notes-new'>
        <div className='card border-light'>
          <div className='card-body'>
            <form className='notes-new__form'>
              <div className='form-group p-1'>
                <input 
                  className='notes-new__input' 
                  type='text' 
                  placeholder='New Note Title' />
              </div>
              <div className='form-group mt-3'>
                <textarea 
                  className='notes-new__textarea' 
                  placeholder='Add text'>
                </textarea>
                <small className='form-text text-muted text-center'>
                  Press anywhere to save.
                </small>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>)
  }

  render() {
    return(
      <div className='notes-index mt-5'>
        <div className='row'>
          {this.renderNewNote()}
          {this.renderNotes()}
        </div>
      </div>
    )
  }
}
