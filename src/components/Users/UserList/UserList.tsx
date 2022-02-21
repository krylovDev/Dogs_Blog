import React, { useState, useEffect } from 'react';
import './UserList.scss';
import { useHistory } from 'react-router-dom';
import { Pagination, Spin, Space } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { UserListState, State } from '../../../types/state';
import * as actions from '../../../redux/actions/users';
import { UserType } from '../../../types/types';
import UserItem from '../UserItem/UserItem';

interface Props {
  users: UserListState;
  page: any;
  limit: any;
  total: any;
  loading: any;
  loadUserList: (pageNumber: number, limitNumber: number) => any;
}

const UserList = ({
  users,
  page,
  limit,
  total,
  loading,
  loadUserList,
}: Props) => {
  const [pageSizeArray] = useState(['12', '27', '48'] as Array<string>);
  const history = useHistory();

  const updatePageNumber = (current: number, limitNumber: number): void => {
    loadUserList(current, limitNumber);
  };

  useEffect(() => {
    loadUserList(page, limit);
    history.push(`/users?page=${page}&limit=${limit}`);
  }, []);

  return (
    <section className="user">
      {loading && (
        <Space size="middle">
          <Spin size="large" />
        </Space>
      )}
      {!loading && (
        <>
          <h1 className="user__title">Пользователи</h1>
          <ul className="user__list">
            {users?.users && users.users.map((item: UserType, index: number) => (
              <li className="user__item" key={index}>
                <UserItem item={item} />
              </li>
            ))}
          </ul>
          <div className="user__footer">
            <Pagination
              total={total}
              pageSize={limit}
              pageSizeOptions={pageSizeArray}
              current={page + 1}
              onChange={updatePageNumber}
            />
          </div>
        </>
      )}
    </section>
  );
};

export default connect(
  (state: State) => ({
    users: state.users,
    total: state.users.total,
    page: state.users.page,
    limit: state.users.limit,
    loading: state.users.loading,
    error: state.users.error,
  }),
  (dispatch: any) => bindActionCreators(actions, dispatch),
)(UserList);
