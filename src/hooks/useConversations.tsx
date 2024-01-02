import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { TConversation } from '../types/Conversation';
import { useAuth } from './auth/useAuth';
import { useErrorLogging } from './useErrorLogging';
import { useSession } from './useSession';
import { ClimateApi } from '../api/ClimateApi';
import { useToastMessage } from 'shared/hooks';

export function useConversations() {
  const { sessionId } = useSession();
  const { accessToken } = useAuth();
  const { showSuccessToast, showErrorToast } = useToastMessage();

  const [conversations, setConversations] = useState([] as TConversation[]);
  const [friend, setFriend] = useState('');
  const [conversationId, setConversationId] = useState('');
  const { logError } = useErrorLogging();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // set data to state when fetched
  useEffect(() => {
    if (sessionId && accessToken) {
      setIsLoading(true);
      setIsError(false);
      new ClimateApi(sessionId, accessToken)
        .getConversations()
        .then((data) => {
          setConversations(data.conversations);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
          setIsError(true);
        });
    }
  }, [sessionId, accessToken]);

  const mutation = useMutation(
    () => new ClimateApi(sessionId, accessToken).postConversation(friend),
    {
      onError: (error: any) => {
        showErrorToast(error.response?.data?.error || 'Unknow Error has occurred');
        logError(error);
      },
      onSuccess: (response: { conversationId: string; message: string }) => {
        setConversationId(response.conversationId);
      },
    }
  );

  const { mutateAsync } = mutation;

  const deleteConversationMutation = useMutation(
    (id: string) =>
      new ClimateApi(sessionId, accessToken).deleteConversation(id),
    {
      onError: (error: any) => {
        showErrorToast(error.response?.data?.error || 'Unknow Error has occurred');
        logError(error);
      },
      onSuccess: (response: { conversationId: string; message: string }) => {
        setConversations(
          conversations.filter(
            (x: TConversation) => x.conversationId !== response.conversationId
          )
        );
        showSuccessToast('Conversation deleted');
        setConversationId(response.conversationId);
      },
    }
  );

  const addConversation = async (friend: string) => {
    setFriend(friend);
    await mutateAsync();
  };

  const removeConversation = async (id: string) => {
    deleteConversationMutation.mutate(id);
  };

  return {
    conversations,
    isLoading,
    isError,
    addConversation,
    removeConversation,
    conversationId,
  };
}
