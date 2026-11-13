import React from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import qs from 'qs';
import { theme } from 'styles/theme';
import { IWorkspaceProjectUploadList } from 'types/workspace-project-upload-interface';

import Retry from '../../../SVG/Icon/Retry';
import Button from '../Button';
import Radio from '../Radio';

interface IUploadStatus {
  item: IWorkspaceProjectUploadList;
  index: number;
  handleFileCheck: (item: IWorkspaceProjectUploadList) => void;
  isFileCheck?: IWorkspaceProjectUploadList | null;
  progress?: {
    percent: number;
    finish: boolean;
    error: boolean;
  };
  handleRetry: (fileId?: string) => void;
}

const UploadStatus: React.FC<IUploadStatus> = ({ item, index, handleFileCheck, isFileCheck, progress, handleRetry }) => {
  const { search } = useLocation();
  const query = qs.parse(search, {
    ignoreQueryPrefix: true,
  });
  return (
    <li>
      <Radio
        className="li-1"
        name={`all-file-${item.file_id}`}
        checked={isFileCheck?.file_id === item.file_id}
        onClick={() => handleFileCheck(item)}
        disabled={item.file_status !== 'Error'}
      />
      <div
        className={classNames('li-2', {
          success: item.file_status === 'Success',
          error: item.file_status === 'Error',
        })}
      >
        {index + 1 + ((query.page ? Number(query.page) : 1) - 1) * 10}
      </div>
      <div
        className={classNames('li-3', {
          success: item.file_status === 'Success',
          error: item.file_status === 'Error',
        })}
      >
        {item.file_name}
      </div>
      <div
        className={classNames('li-4', {
          success: item.file_status === 'Success',
          error: item.file_status === 'Error',
        })}
      >
        {progress && (progress.percent !== 100 || !progress.finish) ? (
          progress.error ? (
            <div className="retry">
              <span className="error">Failed</span>
              <Button variant="outline" onClick={() => handleRetry(isFileCheck?.file_id)}>
                <Retry width="16" height="16" color={theme.adminColor.txt2} />
              </Button>
            </div>
          ) : (
            <div className="upload-progress">
              <div className="upload-progress-bar" style={{ width: `${progress.percent || 0}%` }}>
                <div className="upload-progress-text">{progress.percent}%</div>
              </div>
            </div>
          )
        ) : (
          item.file_status
        )}
      </div>
      <div
        className={classNames('li-4', {
          success: item.file_status === 'Success',
          error: item.file_status === 'Error',
        })}
      >
        {item.file_size}
      </div>
    </li>
  );
};

export default UploadStatus;
