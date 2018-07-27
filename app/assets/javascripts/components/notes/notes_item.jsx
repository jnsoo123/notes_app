class NotesItem extends React.Component {
  componentWillReceiveProps() {
    console.log('received props') 
  }

  render() {
    return(
      <div className='notes-item col-md-4 mt-3'>
        <div className='card border-light'>
          <div className='card-body'>
            <h4 className='pt-2 clearfix'>
              <span className='float-left'>
                {this.props.note.title}
              </span>
              <span className='float-right'>
                <a 
                  href='#' 
                  className='text-danger' 
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
