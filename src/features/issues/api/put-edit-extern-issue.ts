import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from '@/config/lib/axios';
import { ISSUES_ENDPOINT } from '@/features/issues/constants/requests';
import { toast } from '@/utils/toast';
import { ApiError } from '@/config/lib/axios/types';
import { SCHEDULE_CACHE_KEYS } from '@/features/schedules/constants/cache';
import { PutUpdateExternIssueParams } from '@/features/issues/types';

async function putUpdateExternIssue(data: PutUpdateExternIssueParams) {
  const { issueId } = data;
  console.log('json', JSON.stringify(data));
  const response = await api.put<boolean>(
    `${ISSUES_ENDPOINT}/issuesOpen/${issueId}`,
    data
  );
  return response.data;
}

export function usePutUpdateExternIssue({
  onSuccessCallBack,
}: {
  onSuccessCallBack?: () => void;
}) {
  const queryClient = useQueryClient();

  return useMutation(putUpdateExternIssue, {
    onSuccess() {
      queryClient.invalidateQueries([SCHEDULE_CACHE_KEYS.allSchedules]);
      queryClient.invalidateQueries([SCHEDULE_CACHE_KEYS.allSchedules]);

      toast.success('Agendamento externo atualizado com sucesso!');

      onSuccessCallBack?.();
    },
    onError(error: AxiosError<ApiError>) {
      const errorMessage = Array.isArray(error?.response?.data?.message)
        ? error?.response?.data?.message[0]
        : error?.response?.data?.message;
      toast.error(
        errorMessage ?? '',
        'Houve um problema ao tentar atualizar o agendamento externo.'
      );
    },
  });
}
