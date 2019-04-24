import React from 'react';

class TrainingDetailAdminPage extends React.Component {
  constructor (props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const { training_id } = this.props.match.params;
    return (
      <div>{training_id}</div>
    );
  }
}
export default TrainingDetailAdminPage;