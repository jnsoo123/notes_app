class NotesItem extends React.Component {
  render() {
    return(
      <div className='notes-item col-md-4 mt-3'>
        <div className='card border-light'>
          <div className='card-body'>
            <h4 className='pt-2'>{this.props.note.title}</h4>
            <p className='notes-item__body mt-4'>
              {this.props.note.body} 
            </p>
          </div>
        </div>
      </div>
    ) 
  }
}
