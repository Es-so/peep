import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card, Col, Row, Input, Icon } from 'antd';
import styled from 'styled-components';
import easydate from 'easydate';
import { loadNotes } from '../../actions/notes';
import { Header, HeaderLeft, HeaderRight } from '../Header';

export const Search = Input.Search;

export const TitleIconElt = styled(Icon)`
  margin: 0.5em;
`;

export const Title = styled.h2`
`;

export const CardElt = styled(Card)`
  margin: 5px;
  background: whitesmoke !important;
  minWidth: 50px !important;
  fontSize: 1em !important;
  font-weight: bold !important;
  &:hover {
  	background: white !important;
  	boxShadow: 5px 5px 20px 2px black !important;
  }
`;

export const FooterElt = styled.div`
  font-weight: normal !important;
`;

export const Footer = ({ note }) => {
  return (
  	<FooterElt>
    {
      [
        note.authorId,
        (<br key={note._id} />),
        Date(easydate('d-M-Y', Notes.createdAt)),
      ]
    }
    </FooterElt>
  )
}

Footer.propTypes = {
  note: PropTypes.object.isRequired,
}

export const HeaderNotes = () =>
  <Header>
    <HeaderLeft>
      <TitleIconElt type="pushpin-o" />
      <Title>Notes</Title>
    </HeaderLeft>
    <HeaderRight>
      <Search
        size="large"
        placeholder="Enter your filter"
      />
    </HeaderRight>
  </Header>
;

export const CardContent = ({ note }) =>
  <div>
    {note.content}
    <hr />
    <Footer note={note} />
  </div>
;

CardContent.propTypes = {
  note: PropTypes.object.isRequired,
}

export class Notes extends Component {
  componentWillMount() {
    const { loadNotes } = this.props;
    loadNotes();
  }

  render() {
    const { notes } = this.props;
    return(
      <div>
        <HeaderNotes />
        <Row style={{ display: 'flex !important'}} >
        {
          notes.data.map(note => (
            <Col key={note._id} sm={24} md={12} lg={8} >
              <CardElt key={note._id} bordered={false}>
                <CardContent note={note} />
              </CardElt>
            </Col>))
        }
        </Row>
      </div>
    )
  }
}

Notes.propTypes = {
  notes: PropTypes.object.isRequired,
  loadNotes: PropTypes.func.isRequired,
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  loadNotes: bindActionCreators(loadNotes, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
