import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUserActions } from 'actions/auth-action';
import classNames from 'classnames';
import styled from 'styled-components';
import { theme } from 'styles/theme';
import { IAlert } from 'types/interface';
import { isCustomError } from 'utils/error';
import { v7 as uuidv7 } from 'uuid';

import Button from 'components/Common/Admin/Button';
import ModalContainer from 'components/Modal';
import Alert from 'components/Modal/Alert';
import Copy from 'components/SVG/Icon/Copy';
import Success from 'components/SVG/Icon/Suceess';
import VisibilityOn from 'components/SVG/Icon/VisabilityOn';
import VisibilityOff from 'components/SVG/Icon/VisibilityOff';
import Warning from 'components/SVG/Icon/Warning';

const Container = styled.section`
  background-color: #f3f4f8;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  .content-wrapper {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 20px;
    min-height: calc(100vh - 120px); /* notice 공간 확보 */
  }

  .init-setting {
    width: 100%;
    max-width: 540px;
    padding: 32px 60px;
    background-color: #fff;
    border-radius: 8px;
    border: 1px solid #e3edf9;
    .success-icon-box {
      text-align: center;
      margin-bottom: 16px;
    }
    .title {
      color: #000;
      font-size: 24px;
      text-align: center;
      font-weight: 600;
    }
    .description {
      color: #6c6c6c;
      font-size: 16px;
      font-weight: 600;
      margin-top: 20px;
      text-align: center;
    }
    .input-form {
      margin-top: 32px;
    }
    .input-box-wrapper {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 24px;
      button {
        width: 84px;
        height: 56px;
        background-color: #505050;
        border-radius: 4px;
        color: #fff;
        font-size: 20px;
        font-weight: 600;
        border: none;
        outline: none;
      }
    }
    .notice-recovery-code {
      margin-top: 8px;
      padding: 12px 16px;
      background-color: #ff5d5d;
      display: flex;
      align-items: center;
      gap: 8px;
      color: #fff;
      border-radius: 4px;
      span {
        font-size: 12px;
        font-weight: 600;
        line-height: 16px;
      }
      &.copy {
        background-color: #4d6dff;
      }
    }
    .continue-text {
      margin-top: 12px;
      color: #727272;
      font-size: 12px;
      font-weight: 600;
      line-height: 20px;
      text-align: center;
    }
    .input-box {
      margin-bottom: 12px;
      position: relative;
      svg {
        position: absolute;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
        cursor: pointer;
      }
      .input-box-inner-text {
        margin-top: 4px;
        color: #969696;
        text-align: right;
        font-size: 12px;
      }
    }
    .input-box-inner {
      width: 100%;
      padding: 8px 16px;
      border: 1px solid #eee;
      border-radius: 4px;
      height: 56px;
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
        color: #6c6c6c;
        font-size: 12px;
        font-weight: 600;
      }
      input {
        width: 100%;
        height: 40px;
        padding-top: 20px;
        font-weight: 600;
        color: #616161;
        border: none;
        outline: none;
        background-color: transparent;
        &::placeholder {
          color: #c8c8c8;
        }
      }
    }
    ul {
      margin-top: 12px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      li {
        font-weight: 500;
        color: #ff0000;
        font-size: 12px;
        line-height: 16px;
      }
    }
    .button-wrapper {
      padding-top: 16px;
    }
  }

  .notice {
    padding: 40px 20px;
    color: #727272;
    font-size: 16px;
    text-align: center;
    font-weight: 600;
    flex-shrink: 0; /* 압축되지 않도록 */
  }
`;

interface IProps {
  navigateLogin: () => void;
}

const InitSetting = ({ navigateLogin }: IProps) => {
  const {
    register,
    handleSubmit,
    watch,
    setFocus,
    setValue,
    getValues,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      adminId: '',
      password: '',
      confirmPassword: '',
      recoveryCode: '',
    },
  });
  const [isAlert, setIsAlert] = useState<IAlert>({
    open: false,
    title: '',
    content: '',
    type: '',
    alertType: 'alert',
  });
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const { signup } = useUserActions();
  const [isCopy, setIsCopy] = useState(false);
  const [isPasswordType, setIsPasswordType] = useState<string>('password');
  const [isConfirmPasswordType, setIsConfirmPasswordType] = useState<string>('password');
  const [isSignupSubmit, setIsSignupSubmit] = useState(false);

  const password = watch('password');

  const handleInputFocus = (inputName: string) => {
    setFocusedInput(inputName);
  };

  const handleInputBlur = () => {
    setFocusedInput(null);
  };

  const onSubmit = async () => {
    try {
      // const res = await existAdminAccount();
      // if (res) {
      //   setIsAlert({
      //     open: true,
      //     title: '알림',
      //     content: '관리자 계정이 이미 존재합니다.',
      //     type: 'alert',
      //     alertType: 'alert',
      //   });
      //   return;
      // }
      const uuid = uuidv7();
      setValue('recoveryCode', uuid);
    } catch (err) {
      setIsAlert({
        open: true,
        title: '알림',
        content: `${isCustomError(err) && err?.message ? err.message : '관리자 계정 생성에 실패했습니다'}`,
        type: 'alert',
        alertType: 'alert',
      });
    }
  };

  const onSignupSubmit = async () => {
    try {
      const data = getValues();
      const res = await signup(data);
      if (res?.code === 'U001') {
        setIsAlert({
          open: true,
          title: '알림',
          content: res?.message,
          type: 'signup',
          alertType: 'alert',
        });
        return;
      }
      setIsSignupSubmit(true);
      navigateLogin();
    } catch (err) {
      setIsAlert({
        open: true,
        title: '알림',
        content: `${isCustomError(err) && err?.message ? err.message : '관리자 계정 생성에 실패했습니다'}`,
        type: 'alert',
        alertType: 'alert',
      });
    } finally {
      setIsSignupSubmit(false);
    }
  };

  const handleBackSignup = () => {
    setValue('recoveryCode', '');
  };

  // 비밀번호 복잡도 검증 함수
  const validatePassword = (value: string) => {
    if (!value) return '비밀번호는 필수 정보입니다.';
    if (value.length < 8) return '비밀번호는 최소 8자 이상이어야 합니다.';

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumbers = /\d/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
      return '비밀번호는 대소문자, 숫자, 특수문자가 포함되어야 합니다.';
    }

    return true;
  };

  const onCancel = () => {
    if (isAlert.type === 'signup') {
      handleBackSignup();
    }
    setIsAlert({
      open: false,
      title: '',
      content: '',
      type: '',
      alertType: 'alert',
    });
  };

  const handleCopy = async () => {
    const recoveryCode = getValues('recoveryCode');
    try {
      await navigator.clipboard.writeText(recoveryCode);
      setIsCopy(true);
    } catch (err) {
      // 클립보드 API가 지원되지 않는 경우 fallback
      const textArea = document.createElement('textarea');
      textArea.value = recoveryCode;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        document.execCommand('copy');
        setIsCopy(true);

        // 3초 후에 복사 상태를 초기화
      } catch (fallbackErr) {
        setIsAlert({
          open: true,
          title: '알림',
          content: '복사에 실패했습니다. 브라우저에서 복사 기능을 지원하지 않습니다.',
          type: 'alert',
          alertType: 'alert',
        });
      } finally {
        document.body.removeChild(textArea);
      }
    }
  };

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

  const handleConfirmPasswordType = () => {
    if (isConfirmPasswordType === 'password') {
      setIsConfirmPasswordType('text');
    } else {
      setIsConfirmPasswordType('password');
    }
    setTimeout(() => {
      setFocus('confirmPassword');
    }, 0);
  };

  return (
    <Container>
      {isAlert.open && (
        <ModalContainer id="modal">
          <Alert title={isAlert.title} type="alert" content={isAlert.content} onConfirm={onCancel} />
        </ModalContainer>
      )}
      {watch('recoveryCode') ? (
        <div className="content-wrapper">
          <div className="init-setting">
            <div className="success-icon-box">
              <Success width="64" height="64" />
            </div>
            <div className="title">설정 완료</div>
            <div className="description">복구코드가 성공적으로 생성되었습니다</div>
            <div className="input-box-wrapper">
              <div className="input-box-inner" style={{ width: '368px' }}>
                <div className="input-label">복구 코드</div>
                <input type="text" value={watch('recoveryCode')} disabled />
              </div>
              <button className="copy-button" onClick={handleCopy}>
                복사
              </button>
            </div>
            <div className={classNames('notice-recovery-code', { copy: isCopy })}>
              {isCopy ? (
                <>
                  <Copy width="32" height="32" />
                  <span>복구 코드가 정상적으로 복사되었습니다.</span>
                </>
              ) : (
                <>
                  <Warning width="32" height="32" />
                  <span>
                    복구 코드는 관리자 비밀번호를 잊었을 때 재설정에 필요하니,
                    <br />
                    텍스트 파일이나 메모장 등 안전한 곳에 보관하세요.
                  </span>
                </>
              )}
            </div>
            <div className="button-wrapper">
              <Button type="button" onClick={onSignupSubmit} disabled={isSignupSubmit || !isCopy}>
                계정 생성하기
              </Button>
            </div>
            <div className="continue-text">계정 생성하기 클릭 후 로그인 화면으로 이동합니다</div>
          </div>
        </div>
      ) : (
        <>
          <div className="content-wrapper">
            <div className="init-setting">
              <div className="title">관리자 설정</div>
              <div className="description">시스템을 사용하기 위해 관리자 계정을 생성해주세요</div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-form">
                  <div className="input-box">
                    <div className={`input-box-inner ${focusedInput === 'name' ? 'focus' : ''} ${errors.name ? 'error' : ''}`}>
                      <div className="input-label">사용자명</div>
                      <input
                        type="text"
                        placeholder="사용자명을 입력해주세요"
                        onFocus={() => handleInputFocus('name')}
                        {...register('name', {
                          onBlur: handleInputBlur,
                          required: '사용자명은 필수 정보입니다.',
                          maxLength: {
                            value: 20,
                            message: '사용자명은 20자 이내로 입력해주세요.',
                          },
                        })}
                      />
                    </div>
                    <div className="input-box-inner-text">한,영,숫자,특수문자 가능 / 20자 이내</div>
                  </div>
                  <div className="input-box">
                    <div className={`input-box-inner ${focusedInput === 'adminId' ? 'focus' : ''} ${errors.adminId ? 'error' : ''}`}>
                      <div className="input-label">관리자 ID</div>
                      <input
                        type="text"
                        placeholder="관리자 ID를 입력해주세요"
                        onFocus={() => handleInputFocus('adminId')}
                        {...register('adminId', {
                          onBlur: handleInputBlur,
                          required: '관리자 ID는 필수 정보입니다.',
                          pattern: {
                            value: /^[A-Za-z0-9]+$/,
                            message: '관리자 ID는 영어, 숫자만 입력 가능합니다.',
                          },
                        })}
                      />
                    </div>
                    <div className="input-box-inner-text">영어, 숫자 가능</div>
                  </div>
                  <div className="input-box">
                    <div className={`input-box-inner ${focusedInput === 'password' ? 'focus' : ''} ${errors.password ? 'error' : ''}`}>
                      <div className="input-label">비밀번호</div>
                      <input
                        type={isPasswordType}
                        placeholder="비밀번호를 입력해주세요"
                        onFocus={() => handleInputFocus('password')}
                        {...register('password', {
                          onBlur: handleInputBlur,
                          validate: validatePassword,
                        })}
                      />
                      {isPasswordType === 'password' ? (
                        <VisibilityOff width="20" height="20" color={theme.adminColor.txt2} onClick={handlePasswordType} />
                      ) : (
                        <VisibilityOn width="20" height="20" color={theme.adminColor.txt2} onClick={handlePasswordType} />
                      )}
                    </div>
                  </div>
                  <div className="input-box">
                    <div className={`input-box-inner ${focusedInput === 'confirmPassword' ? 'focus' : ''} ${errors.confirmPassword ? 'error' : ''}`}>
                      <div className="input-label">비밀번호 확인</div>
                      <input
                        type={isConfirmPasswordType}
                        placeholder="비밀번호를 입력해주세요"
                        onFocus={() => handleInputFocus('confirmPassword')}
                        {...register('confirmPassword', {
                          onBlur: handleInputBlur,
                          validate: (value) => {
                            if (!value) return '비밀번호 확인은 필수입니다.';
                            if (value !== password) return '입력한 비밀번호가 서로 일치하지 않습니다.';
                            return true;
                          },
                        })}
                      />
                      {isConfirmPasswordType === 'password' ? (
                        <VisibilityOff width="20" height="20" color={theme.adminColor.txt2} onClick={handleConfirmPasswordType} />
                      ) : (
                        <VisibilityOn width="20" height="20" color={theme.adminColor.txt2} onClick={handleConfirmPasswordType} />
                      )}
                    </div>
                    <div className="input-box-inner-text">최소 8자, 대소문자, 숫자, 특수문자 포함</div>
                  </div>
                </div>
                {/* 에러 메시지 표시 */}
                {(errors.name || errors.adminId || errors.password || errors.confirmPassword) && (
                  <ul>
                    {errors.name && <li>{errors.name.message}</li>}
                    {errors.adminId && <li>{errors.adminId.message}</li>}
                    {errors.password && <li>{errors.password.message}</li>}
                    {errors.confirmPassword && <li>{errors.confirmPassword.message}</li>}
                  </ul>
                )}
                <div className="button-wrapper">
                  <Button type="submit" disabled={!isValid || isSubmitting}>
                    다음
                  </Button>
                </div>
              </form>
            </div>
          </div>
          <div className="notice">이 설정은 시스템 첫 실행 시에만 나타납니다</div>
        </>
      )}
    </Container>
  );
};

export default InitSetting;
