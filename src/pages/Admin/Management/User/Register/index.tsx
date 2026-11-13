/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useUserManagementActions } from 'actions/user-management-action';
import { AxiosResponse } from 'axios';
import styled from 'styled-components';
import { IAlert, IApi } from 'types/interface';
import axios from 'utils/axios';
import { isCustomError } from 'utils/error';
import { PATH_ADMIN_LIST } from 'utils/path';

import Button from 'components/Common/Admin/Button';
import FormLayout from 'components/Common/Admin/FormLayout';
import Input from 'components/Common/Admin/Input';
import Title from 'components/Common/Admin/Title';
import Layout from 'components/Layout';
import Header from 'components/Layout/Header';
import ModalContainer from 'components/Modal';
import Alert from 'components/Modal/Alert';
import NaviArrow from 'components/SVG/Icon/NaviArrow';

const Container = styled.section`
  padding: 40px;
  .form-name {
    line-height: 17px !important;
  }
  .form-name-sub {
    font-size: ${({ theme }) => theme.fontSize.text_12};
    color: #949ca5 !important;
    margin-top: 16px;
  }
  .sub-title {
    font-size: ${({ theme }) => theme.fontSize.text_20};
    font-weight: 500;
    color: #111;
    margin-top: 40px;
  }

  .btn-wrapper {
    display: flex;
    margin-top: 30px;
    justify-content: flex-end;
    button {
      width: 88px;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
`;

const ManagementUserRegister: React.FC = () => {
  const navigate = useNavigate();
  const [isUserCheck, setIsUserCheck] = useState<boolean>(false);
  const { userRegister } = useUserManagementActions();
  const [isAlert, setIsAlert] = useState<IAlert>({
    open: false,
    title: '',
    content: '',
    type: '',
    alertType: 'alert',
  });
  const {
    register,
    setValue,
    watch,
    setError,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    defaultValues: {
      account: '',
      desc: '',
    },
  });

  // 아이디 입력후 blur 이벤트 발생시 중복 체크
  const handleOnBlur = async () => {
    const { account } = watch();
    if (!account) {
      setError('account', {
        type: 'custom',
        message: '한글자 이상 입력해주세요',
      });
      return;
    }
    try {
      const {
        data: { result, code, data, message },
      }: AxiosResponse<IApi<boolean>> = await axios.get(`/admin/user/check?account=${account}`);
      if (result && code === 'F000') {
        if (data) {
          setError('account', {
            type: 'custom',
            message: '사용 중인 아이디입니다 다른 아이디를 입력 바랍니다',
          });
        }
        setIsUserCheck(!data);
      } else {
        onAlertSetting(true, '알림', message, '', 'alert');
        setIsUserCheck(false);
      }
    } catch (err) {
      onAlertSetting(true, '알림', `${isCustomError(err) && err?.message ? err.message : '네트워크가 불안정합니다'}`, '', 'alert');
    }
  };

  // 아이디 입력시 영어 및 _특수문자만 허용
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setIsUserCheck(false);
    setValue('account', inputValue.replace(/[^a-z0-9_]/g, ''), { shouldValidate: true });
    e.target.value = inputValue.replace(/[^a-z0-9_]/g, '');
  };

  // 설명 입력시 한글, 영어, 숫자만 허용
  const handleDescOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /[^a-zA-Z0-9ㄱ-힣]/g;
    const inputValue = e.target.value;
    const sanitizedValue = inputValue.replace(regex, '');

    setValue('desc', sanitizedValue, { shouldValidate: true });
    e.target.value = sanitizedValue;
  };

  const onAlertSetting = (open: boolean, title: string, content: string, type: string, alertType: 'alert' | 'confirm') => {
    setIsAlert({
      open,
      title,
      content,
      type,
      alertType,
    });
  };

  const onCancel = () => {
    onAlertSetting(false, '', '', '', 'alert');
  };

  const handleCancel = () => {
    navigate(PATH_ADMIN_LIST.USER_MANAGEMENT);
  };

  // 등록
  const onSubmit = handleSubmit(async ({ account, desc }) => {
    try {
      // 사용자 등록
      await userRegister({ account, desc });
      navigate(PATH_ADMIN_LIST.USER_MANAGEMENT);
    } catch (err) {
      onAlertSetting(true, '알림', `${isCustomError(err) && err?.message ? err.message : '사용자 등록에 실패했습니다'}`, '', 'alert');
    }
  });

  return (
    <Layout>
      {isAlert.open && (
        <ModalContainer id="modal">
          <Alert title={isAlert.title} type={isAlert.alertType} content={isAlert.content} onConfirm={onCancel} onCancel={onCancel} />
        </ModalContainer>
      )}
      <Header>
        <span>사용자 관리</span>
        <NaviArrow width="5" height="5" color="#5b636d" className="arrow" />
        <b>&nbsp;사용자 추가</b>
      </Header>
      <Container>
        <Title className="title-box" title="사용자 추가" backUrl={PATH_ADMIN_LIST.USER_MANAGEMENT} />
        <div className="sub-title">사용자 정보 입력</div>
        <form onSubmit={onSubmit}>
          <FormLayout>
            <ul>
              <li>
                <div className="form-name">
                  사용자 ID<span>*</span>
                  <br />
                  <span className="form-name-sub">
                    * 초기 비밀번호는 <b>'user1!'</b> 입니다
                  </span>
                </div>
                <Input
                  register={register}
                  options={{
                    required: '사용자 ID를 입력해주세요',
                  }}
                  type="text"
                  name="account"
                  className="form-input"
                  placeholder="생성할 사용자 ID를 입력해주세요"
                  error={errors.account?.message}
                  onBlur={handleOnBlur}
                  onChange={handleOnChange}
                />
              </li>
              <li>
                <div className="form-name">사용자 설명(10자 내외)</div>
                <Input
                  register={register}
                  type="text"
                  name="desc"
                  className="form-input"
                  placeholder="생성한 사용자 ID의 사용 목적을 입력해주세요"
                  onChange={handleDescOnChange}
                />
              </li>
            </ul>
          </FormLayout>
          <div className="btn-wrapper">
            <Button variant="outline" onClick={handleCancel}>
              취소
            </Button>
            <Button type="submit" disabled={!isValid || !isUserCheck}>
              등록
            </Button>
          </div>
        </form>
      </Container>
    </Layout>
  );
};

export default ManagementUserRegister;
