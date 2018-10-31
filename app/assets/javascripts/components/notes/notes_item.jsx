class NotesItem extends React.Component {
  componentDidMount() {
    // Events for NotesItem
    let $notesItem = $('.notes-item')

    $notesItem.on('mouseover', function() {
      $(this).find('a').removeClass('d-none')
    })

    $notesItem.on('mouseout', function() {
      $(this).find('a').addClass('d-none')
    })
  }

  render() {
    return(
      <div className='notes-item col-md-6 mb-4'>
        <div className='card border-light'>
          <div className='card-body'>
            <h4 className='pt-2 clearfix'>
              <span className='float-left'>
                {this.props.note.title}
              </span>
              <span className='float-right'>
                <a
                  href='#'
                  className='text-danger d-none'
                  onClick={this.props.deleteNote.bind(this, this.props.note)}>
                  <i className='fas fa-times'></i>
                </a>
              </span>
            </h4>
            <pre className='notes-item__body mt-4'>
              {this.props.note.body}
            </pre>
          </div>
        </div>
      </div>
    )
  }
}
