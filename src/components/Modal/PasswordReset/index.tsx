import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUserActions } from 'actions/auth-action';
import useLockBodyScroll from 'hooks/useLockBodyScroll';
import styled from 'styled-components';
import { theme } from 'styles/theme';
import { isCustomError } from 'utils/error';

import Button from 'components/Common/Admin/Button';
import Input from 'components/Common/Admin/Input';
import VisibilityOn from 'components/SVG/Icon/VisabilityOn';
import VisibilityOff from 'components/SVG/Icon/VisibilityOff';

const Container = styled.div`
  .modal-main {
    z-index: 5002;
    position: fixed;
    width: 100%;
    max-width: 540px;
    padding: 40px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    margin: 0 auto;
    background-color: ${({ theme }) => theme.adminColor.white};
    border-radius: 16px;
    .title {
      color: #${({ theme }) => theme.adminColor.txt2};
      font-weight: bold;
      font-size: ${({ theme }) => theme.fontSize.text_16};
    }
    form {
      margin-top: 40px;
      .password-box {
        &.re-password {
          margin-top: 24px;
        }
        & > span {
          color: ${({ theme }) => theme.adminColor.txt2};
          font-size: ${({ theme }) => theme.fontSize.text_16};
          font-weight: 500;
        }
        .password-input {
          margin-top: 8px;
        }
      }
      .notice {
        margin-top: 20px;
        font-size: ${({ theme }) => theme.fontSize.text_16};
        color: #5b636d;
      }
      .btn-wrapper {
        margin-top: 20px;
        text-align: right;
        button {
          width: 88px;
        }
      }
    }
  }

  .overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: ${({ theme }) => theme.adminColor.black};
    opacity: 0.7;
    z-index: 5001;
  }
`;

interface IPasswordResetModal {
  account: string;
  onClose: () => void;
  onAlertOpen: (message: string) => void;
}

const PasswordResetModal: React.FC<IPasswordResetModal> = ({ account, onClose, onAlertOpen }: IPasswordResetModal) => {
  const [isPasswordType, setIsPasswordType] = useState('password');
  const [isRePasswordType, setIsRePasswordType] = useState('password');
  const { passwordReset } = useUserActions();
  const {
    register,
    getValues,
    setFocus,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      password: '',
      rePassword: '',
    },
  });

  useLockBodyScroll();

  const onSubmit = handleSubmit(async ({ password }) => {
    try {
      const formData = {
        account,
        password: 'user1!',
        changePassword: password,
      };
      await passwordReset(formData);
      onClose();
    } catch (err) {
      onAlertOpen(`${isCustomError(err) && err?.message ? err.message : '비밀번호 재설정을 실패했습니다'}`);
    }
  });

  const handlePasswordType = () => {
    if (isPasswordType === 'password') {
      setIsPasswordType('text');
    } else {
      setIsPasswordType('password');
    }
    setTimeout(() => {
      setFocus('password');
    }, 0);
  };

  const handleRePasswordType = () => {
    if (isRePasswordType === 'password') {
      setIsRePasswordType('text');
    } else {
      setIsRePasswordType('password');
    }
    setTimeout(() => {
      setFocus('rePassword');
    }, 0);
  };

  return (
    <Container>
      <div className="overlay" />
      <div className="modal-main">
        <p className="title">비밀번호 재설정</p>
        <form onSubmit={onSubmit}>
          <div className="password-box">
            <span>변경할 비밀번호</span>
            <Input
              register={register}
              options={{
                required: '비밀번호를 입력해주세요',
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()\-_=+[{\]};:'",<.>/?]).*$/,
                  message: '소문자,특수문자,숫자를 포함한 비밀번호를 입력해주세요',
                },
              }}
              type="password"
              name="password"
              className="password-input"
              placeholder="소문자,특수문자,숫자를 포함한 비밀번호를 입력해주세요"
              error={errors.password?.message}
              icon={
                isPasswordType !== 'text' ? (
                  <VisibilityOff width="24" height="24" color={theme.adminColor.txt2} onClick={handlePasswordType} />
                ) : (
                  <VisibilityOn width="24" height="24" color={theme.adminColor.txt2} onClick={handlePasswordType} />
                )
              }
            />
          </div>
          <div className="password-box re-password">
            <span>비밀번호 확인</span>
            <Input
              register={register}
              options={{
                required: '비밀번호를 입력해주세요',
                validate: {
                  samePassword: (value) => value === getValues('password') || '비밀번호가 일치하지 않습니다',
                },
              }}
              type="password"
              name="rePassword"
              className="password-input"
              placeholder="비밀번호를 한번 더 입력해주세요"
              error={errors.rePassword?.message}
              icon={
                isRePasswordType !== 'text' ? (
                  <VisibilityOff width="24" height="24" color={theme.adminColor.txt2} onClick={handleRePasswordType} />
                ) : (
                  <VisibilityOn width="24" height="24" color={theme.adminColor.txt2} onClick={handleRePasswordType} />
                )
              }
            />
          </div>
          <div className="notice">* 비밀번호 변경 후 작업이 가능합니다</div>
          <div className="btn-wrapper">
            <Button type="submit" disabled={!isValid}>
              확인
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default PasswordResetModal;
