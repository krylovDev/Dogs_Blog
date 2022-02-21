/* eslint-disable */
import React, { useState } from 'react';
import {Redirect, Link, useHistory} from 'react-router-dom';
import './LogIn.scss';
import moment from 'moment';
import 'moment/locale/ru';
import {
  Form, Input, Button, Select, DatePicker, InputNumber,
} from 'antd';
import { UserOutlined, MailOutlined } from '@ant-design/icons';
import locale from 'antd/es/date-picker/locale/ru_RU';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../redux/actions/users';
import { State } from '../../../types/state';
import { UserType } from '../../../types/types';
import { createUser } from '../../../api/dumMyApi';

const { Option } = Select;

interface Props {
  createNewUser: (body: UserType, callback: any) => any;
}

export const Login = () => {
  const [form] = Form.useForm();
  const [redirect, setRedirect] = useState(false);
  const [userId, setUserId] = useState('' as string);
  const history = useHistory();

  const onChange = (value: any): void => {
    console.log('changed', value);
  };

  const onFinish = (values: UserType) => {
    const {
      firstName, lastName, email, phone, gender, picture, title,
    } = values;
    const isDateOfBirth = values.dateOfBirth;

    let dateOfBirth;
    if (isDateOfBirth) {
      dateOfBirth = moment(new Date(isDateOfBirth), 'MM/DD/YYYY').toString();
    }

    createUser({
      firstName, lastName, email, phone, gender, dateOfBirth, picture, title,
    }, (resp: UserType) => {
      if (resp && resp.id) {
        setUserId(resp.id);
        window.localStorage.setItem('user', JSON.stringify(resp));
        window.localStorage.setItem('user_id', JSON.stringify(resp.id));
        window.localStorage.setItem('auth', JSON.stringify(true));
        history.push(`/user/${resp.id}`);
        window.location.reload();
      }
    });
  };

  return (
    <div className="login">
      <div className="login__container">
        <h1 className="login__title">Регистрация</h1>
        <Form
          id="login-form"
          name="basic"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 50,
          }}
          form={form}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Имя"
            name="firstName"
            rules={[
              {
                required: true,
                message: 'Обязательное поле',
              },
              {
                pattern: new RegExp(/^[A-zА-я \\-]+$/i),
                message: 'Имя должно содержать английские или русские буквыб пробелы и тире',
              },
            ]}
          >
            <Input placeholder="Введите имя..." prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item
            label="Фамилия"
            name="lastName"
            rules={[
              {
                required: true,
                message: 'Обязательное поле',
              },
              {
                pattern: new RegExp(/^[A-zА-я \\-]+$/i),
                message: 'Фамилия должно содержать английские или русские буквыб пробелы и тире',
              },
            ]}
          >
            <Input placeholder="Введите фамилию..." prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item
            label="Обращение"
            name="title"
          >
            <Select placeholder="Как к вам обращаться?" allowClear>
              <Option value="mr">mr</Option>
              <Option value="ms">ms</Option>
              <Option value="mrs">mrs</Option>
              <Option value="miss">miss</Option>
            </Select>
          </Form.Item>
          <div className="login__wrap">
            <Form.Item
              name="gender"
              label="Пол"
            >
              <Select placeholder="Ваш пол" allowClear>
                <Option value="male">Мужской</Option>
                <Option value="female">Женский</Option>
              </Select>
            </Form.Item>
            <Form.Item name="dateOfBirth" label="Дата рождения">
              <DatePicker defaultValue={moment(new Date(), 'YYYY-MM-DD')} locale={locale} />
            </Form.Item>
          </div>
          <Form.Item
            wrapperCol={{
              offset: 4,
              span: 16,
            }}
          />
          <div className="login__wrap">
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: 'email',
                  message: 'Некорректная электронная почта',
                },
                {
                  required: true,
                  message: 'Обязательное поле',
                },
                {
                  pattern: new RegExp(/^[A-z0-9._-]+@[A-z0-9._-]+.[A-z0-9._-]{1,3}$/i),
                  message: 'Почта не может содержать русские буквы и спец символы',
                },
              ]}
            >
              <Input placeholder="Введите Email..." prefix={<MailOutlined />} />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Номер телефона"
              rules={[
                {
                  pattern: new RegExp(/^\8\d{10}$/i),
                  message: 'Введите телефон в формате 8ХХХХХХХХХХ',
                },
              ]}
            >
              <InputNumber
                placeholder="8XXXXXXXXXX"
                controls={false}
                style={{
                  width: '100%',
                }}
                onChange={onChange}
              />
            </Form.Item>
          </div>
          <Form.Item
            label="Аватарка"
            name="picture"
            rules={[
              {
                type: 'url',
                message: 'Введите url аватарки',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <div className="login__footer">
            <Button type="primary" htmlType="submit">
              Регистрация
            </Button>
            <p className="login__link">
              Уже есть аккаунт?
              <Link to="/signin">Войти</Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default connect(
  (state: State) => ({
    loading: state.posts.loading,
    error: state.posts.error,
  }),
  (dispatch: any) => bindActionCreators(actions, dispatch),
)(Login);
