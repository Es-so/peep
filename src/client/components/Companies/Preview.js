import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Card, Icon, Tag } from 'antd';
import R from 'ramda';
import Avatar from '../Avatar';
import { Preferred } from '../widgets';

export const ContainerElt = styled(Card)`
  background: #ececec !important;
  height: 72px;
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  &:hover {
    box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.3) !important;
  }
`;

export const ContainerLeftElt = styled.div`
  flex: 0.9;
  display: flex;
  align-items: center;
  padding: 5px;
  flex-grow: 1.8;
`;

export const ContainerRightElt = styled.div`
  zIndex: 2;
  width: 18px;
  position: absolute;
  top: 15px;
  right: 10px;
`;

export const IconStyleElt = styled(Icon)`
  cursor: pointer;
  font-size: 20px;
`;

export const TagContainerElt = styled.div`
  zIndex: 1;
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
`;

export const TagStyleElt = styled(Tag)`
  font-size: 0.8em !important;
`
export const LabelElt = styled.span`
  padding: .3rem;
  cursor: pointer;
`;

export const NameElt = styled.p`
  font-size: 15px;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 110px;
  overflow: hidden;
  font-weight: bold;
  cursor: pointer;
`;

export class Preview extends Component {
  state = {
    showActions: false,
  }
  handleMouseEnter = () => {
    this.setState({ showActions: true });
  }
  handleMouseLeave = () => {
    this.setState({ showActions: false });
  }
  render() {
    const { company, filterCompanyList, togglePreferred } = this.props;
    const handleClick = tag => filterCompanyList(`#${tag}`);
    const tags = () => {
      const tagsTmp = R.prop('tags')(company);
      if (!tagsTmp) return null;
      return (
        R.compose(R.map(v =>
          <TagStyleElt color="#bf5a5a" key={v}>
            <LabelElt>
              <a onClick={() => handleClick(v)}>{v}</a>
            </LabelElt>
          </TagStyleElt>))(tagsTmp)
      );
    };
    const actions = () => {
      if (!this.state.showActions) return <ContainerRightElt />;
      return (
        <ContainerRightElt>
          <IconStyleElt type="delete" />
          <IconStyleElt type="edit" />
        </ContainerRightElt>
      );
    };
    const handlePreferred = (company) => togglePreferred(company);
    return (
      <ContainerElt
        onMouseOver={this.handleMouseEnter}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <ContainerLeftElt>
          <Avatar name={company.name} color={company.avatar ? company.avatar.color : "darkgrey"} showTooltip />
          <Preferred active={company.preferred} onChange={() => handlePreferred(company)} />
          <NameElt>{company.name}</NameElt>
          <TagContainerElt>
            { tags() }
          </TagContainerElt>
        </ContainerLeftElt>
        { actions() }
      </ContainerElt>
    );
  }
}

Preview.propTypes = {
  company: PropTypes.object.isRequired,
  filterCompanyList: PropTypes.func.isRequired,
  togglePreferred: PropTypes.func.isRequired,
};

export default Preview;
