import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUserActions } from 'actions/auth-action';
import { styled } from 'styled-components';
import { theme } from 'styles/theme';
import { isCustomError } from 'utils/error';

import Button from 'components/Common/Admin/Button';
import Input from 'components/Common/Admin/Input';
import Close from 'components/SVG/Icon/Close';
import VisibilityOn from 'components/SVG/Icon/VisabilityOn';
import VisibilityOff from 'components/SVG/Icon/VisibilityOff';

const Container = styled.div`
  .modal-main {
    z-index: 5002;
    position: fixed;
    width: 100%;
    max-width: 540px;
    padding: 30px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    margin: 0 auto;
    background-color: ${({ theme }) => theme.adminColor.white};
    border-radius: 16px;
    .title {
      color: #${({ theme }) => theme.adminColor.txt2};
      font-weight: bold;
      font-size: ${({ theme }) => theme.fontSize.text_24};
    }
    .description {
      color: ${({ theme }) => theme.adminColor.secondary};
      font-size: ${({ theme }) => theme.fontSize.text_16};
      font-weight: 500;
      margin-top: 24px;
    }
    & > svg {
      position: absolute;
      top: 20px;
      right: 20px;
      cursor: pointer;
    }
    .input-box-inner {
      width: 100%;
      padding: 8px 16px;
      border: 1px solid #eee;
      border-radius: 4px;
      height: 60px;
      margin-top: 24px;
      position: relative;
      &.focus {
        border: 1px solid #505050;
      }
      &.error {
        border: 1px solid #ff4242;
      }
      .input-label {
        position: absolute;
        top: 10px;
        left: 16px;
        color: #000;
        font-size: 16px;
        font-weight: 600;
      }
      input {
        width: 100%;
        height: 48px;
        padding-top: 20px;
        font-weight: 600;
        color: #000;
        font-size: 16px;
        border: none;
        outline: none;
        background-color: transparent;
        &::placeholder {
          color: #c8c8c8;
        }
      }
    }
    form {
      margin-top: 24px;
      .password-box {
        svg {
          position: absolute;
          top: 25px;
          right: 20px;
          transform: translateY(-50%);
          cursor: pointer;
        }
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
        margin-top: 8px;
        font-size: ${({ theme }) => theme.fontSize.text_16};
        color: #5b636d;
      }
      .btn-wrapper {
        margin-top: 40px;
        display: flex;
        justify-content: center;
        gap: 8px;
        button {
          width: 50%;
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

interface IRecoveryModal {
  onClose: () => void;
  onAlertSetting: (open: boolean, title: string, content: string, type: string, alertType: 'alert' | 'confirm') => void;
}

const RecoveryModal = ({ onClose, onAlertSetting }: IRecoveryModal) => {
  const [isPasswordType, setIsPasswordType] = useState('password');
  const [isRePasswordType, setIsRePasswordType] = useState('password');
  const [step, setStep] = useState<'recoveryCode' | 'passwordReset'>('recoveryCode');
  const { recoveryCodeCheck, passwordRecovery } = useUserActions();
  const {
    register,
    formState: { errors, isValid },
    getValues,
    setError,
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      recoveryCode: '',
    },
  });

  const {
    register: registerPassword,
    formState: { errors: errorsPassword, isValid: isValidPassword },
    getValues: getValuesPassword,
    setFocus,
    setValue,
    watch,
    handleSubmit: handleSubmitPassword,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      account: '',
      password: '',
      rePassword: '',
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const account = await recoveryCodeCheck(data);
      if (!account.is_valid) {
        setError('recoveryCode', { message: '복구 코드가 일치하지 않습니다' });
        return;
      }
      setValue('account', account.account);
      setStep('passwordReset');
    } catch (err) {
      onAlertSetting(true, '알림', `${isCustomError(err) && err?.message ? err.message : '복구 코드 확인에 실패했습니다'}`, 'alert', 'alert');
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

  const onPasswordHandleSubmit = handleSubmitPassword(async (data) => {
    try {
      await passwordRecovery({
        recoveryCode: getValues('recoveryCode'),
        password: data.password,
      });
      onClose();
      onAlertSetting(true, '알림', '비밀번호 재설정이 완료되었습니다', 'alert', 'alert');
    } catch (err) {
      onAlertSetting(true, '알림', `${isCustomError(err) && err?.message ? err.message : '비밀번호 재설정에 실패했습니다'}`, 'alert', 'alert');
    }
  });

  return (
    <Container>
      <div className="overlay" onClick={onClose} />
      <div className="modal-main">
        <Close width="16" height="16" color="#111" onClick={onClose} />
        {step === 'recoveryCode' ? (
          <>
            <p className="title">복구 코드로 재설정</p>
            <div className="description">복구 코드를 입력하여 로그인 정보를 재설정 하세요.</div>
            <form onSubmit={onSubmit}>
              <div className="password-box">
                <span>복구 코드*</span>
                <Input
                  register={register}
                  options={{
                    required: '복구 코드를 입력해주세요',
                  }}
                  type="text"
                  name="recoveryCode"
                  className="password-input"
                  placeholder="ADMIN-RESET-A1B2C3D4"
                  error={errors.recoveryCode?.message}
                />
              </div>
              <div className="notice">* 초기 설정 시 제공된 복구 코드를 입력하세요</div>
              <div className="btn-wrapper">
                <Button type="button" variant="secondary" onClick={onClose}>
                  취소
                </Button>
                <Button type="submit" disabled={!isValid}>
                  확인
                </Button>
              </div>
            </form>
          </>
        ) : (
          <>
            <p className="title">비밀번호 재설정</p>
            <div className="description">복구 코드가 확인되었습니다. 새 비밀번호를 설정하세요.</div>
            <div className="input-box-wrapper">
              <div className="input-box-inner">
                <div className="input-label">재설정할 계정</div>
                <input type="text" value={watch('account')} disabled />
              </div>
            </div>
            <form onSubmit={onPasswordHandleSubmit}>
              <div className="password-box">
                <span>변경할 비밀번호</span>
                <Input
                  register={registerPassword}
                  options={{
                    required: '비밀번호를 입력해주세요',
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()\-_=+[{\]};:'",<.>/?]).*$/,
                      message: '소문자,특수문자,숫자를 포함한 비밀번호를 입력해주세요',
                    },
                  }}
                  type={isPasswordType}
                  name="password"
                  className="password-input"
                  placeholder="소문자,특수문자,숫자를 포함한 비밀번호를 입력해주세요"
                  error={errorsPassword.password?.message}
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
                  register={registerPassword}
                  options={{
                    required: '비밀번호를 입력해주세요',
                    validate: {
                      samePassword: (value) => value === getValuesPassword('password') || '비밀번호가 일치하지 않습니다',
                    },
                  }}
                  type={isRePasswordType}
                  name="rePassword"
                  className="password-input"
                  placeholder="비밀번호를 한번 더 입력해주세요"
                  error={errorsPassword.rePassword?.message}
                  icon={
                    isRePasswordType !== 'text' ? (
                      <VisibilityOff width="24" height="24" color={theme.adminColor.txt2} onClick={handleRePasswordType} />
                    ) : (
                      <VisibilityOn width="24" height="24" color={theme.adminColor.txt2} onClick={handleRePasswordType} />
                    )
                  }
                />
              </div>
              <div className="btn-wrapper">
                <Button type="button" variant="secondary" onClick={onClose}>
                  취소
                </Button>
                <Button type="submit" disabled={!isValidPassword}>
                  확인
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </Container>
  );
};

export default RecoveryModal;
