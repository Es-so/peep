import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import { Icon, Input, Row, Col } from 'antd';
import { Preview } from './Preview';

export const WrapperElt = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  width: 100%;
  height: 1000px;
`;

export const WrapperNavElt = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 30px;
`;

export const SearchInputElt = styled(Input)`
  width: 300px;
  margin: 20px 10px;
`;

export const FilterIconElt = styled(Icon)`
  list-style: none;
`;

export const TitleElt = styled.h3`
  marginBottom: 10px;
`;

export const ListButtonElt = styled.p`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

export const List = ({ companies, ...params }) =>
  <WrapperElt>
      <TitleElt>Companies</TitleElt>
    <Row gutter={10}>
      {
        companies.length && companies.map(company =>
          <Col sm={24} md={12} lg={8} key={company._id}>
            <Preview company={company} {...params}/>
          </Col>
        )
      }
    </Row>
  </WrapperElt>
;


List.propTypes = {
  companies: PropTypes.array.isRequired,
  filterCompanyList: PropTypes.func.isRequired,
  togglePreferred: PropTypes.func.isRequired,
};

export default List;
