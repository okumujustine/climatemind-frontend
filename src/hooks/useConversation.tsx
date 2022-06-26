import { useQuery } from 'react-query';
import { getOneConversation } from '../api/getOneConversation';
import { updateOneConversation } from '../api/updateOneConversation';
import { queryClient } from '../contexts/queryClient';
import { TConversationStatus } from '../types/Conversation';
import { useToast } from './useToast';

export function useConversation(conversationId: string) {
  const { showToast } = useToast();
  const { error, isError, isLoading, data } = useQuery(
    ['conversations', conversationId],
    () => getOneConversation(conversationId),
    {
      // Set retries to one so that if the page is not found the user sees the error quicker
      retry: 1,
    }
  );

  const conversation = data;

  const updateConversationStatus = async (newStatus: TConversationStatus) => {
    try {
      await updateOneConversation(conversationId, {
        conversationStatus: newStatus,
      });
      queryClient.invalidateQueries(['conversations', conversationId]);
      queryClient.invalidateQueries('conversations');
    } catch (err) {
      showToast({
        message: 'Sorry, there was a problem updating the conversation',
        type: 'error',
      });
    }
  };

  return {
    isError,
    isLoading,
    conversation,
    error,
    updateConversationStatus,
  };
}
