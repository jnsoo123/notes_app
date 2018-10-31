class NotesIndex extends React.Component {
  constructor(props) {
    super(props)

    let defaultState = {
      query: ''
    }

    let initialState = $.extend(defaultState, this.props)
    this.state = initialState
  }

  componentDidMount() {
    // Events for Create Form
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

  handleQuery(e) {
    let query = $(e.target).val()

    this.setState({query: query}, () => {
      this.search(query)
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
        this.setState({notes: response.notes})
      },
      complete: () => {
        title.val('')
        text.val('')
      }
    })
  }

  deleteNote(note, event) {
    event.preventDefault()

    if(confirm('Are you sure you want to delete this note?')) {
      $.ajax({
        method: 'DELETE',
        url: `/notes/${note.id}`,
        data: {
          authenticity_token: $('meta[name=csrf-token]').attr('content')
        },
        success: (response) => {
          this.setState({notes: response.notes})
        }
      })
    }
  }

  search(query) {
    $.ajax({
      url: '/searches',
      method: 'GET',
      data: {
        q: {
          title_or_body_cont: query
        }
      },
      success: (response) => {
        this.setState({notes: response.notes})
      }
    })
  }

  renderNotes() {
    console.log('rendered')
    return this.state.notes.map((note, i) => {
      return(
        <NotesItem
          key={i}
          note={note}
          deleteNote={this.deleteNote.bind(this)}/>
      )
    })
  }

  renderNewNote() {
    return(<div className='col-md-6 mb-4'>
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

  renderSearchForm() {
    return(
      <div className='notes-search'>
        <div className='row'>
          <div className='col-12'>
            <div className='form-group'>
              <form onSubmit={this.search.bind(this)}>
                <input
                  value={this.state.query}
                  type='text'
                  className='form-control'
                  onChange={this.handleQuery.bind(this)}
                  placeholder='Search' />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return(
      <div className='notes-index mt-3'>
        {this.renderSearchForm()}
        <div className='row'>
          {this.renderNewNote()}
          {this.renderNotes()}
        </div>
      </div>
    )
  }
}
