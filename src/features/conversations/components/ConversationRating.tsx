// import { useState } from 'react';
import { CmButton, CmTypography } from 'shared/components';
import useApiClient from 'shared/hooks/useApiClient';
import { useUpdateConversation } from '../hooks';
import { useState } from 'react';

interface Props {
  conversationId: string;
  initialRating: number;
  // onRated: () => void;
  conversationState: number;
}

function ConversationRating({ conversationId, conversationState, initialRating }: Props) {
  const apiClient = useApiClient();
  const { updateConversation } = useUpdateConversation();
  const [rating, setRating] = useState(initialRating);

  function submitRating(newRating: number) {
    setRating(newRating);
    if (conversationState === 4) updateConversation(conversationId, { state: 5 });

    apiClient.putSingleConversation({
      conversationId,
      updatedConversation: {
        userARating: newRating,
      },
    });
  }
  return (
    <>
      <CmTypography variant="h1" style={{ textAlign: 'left' }}>
        Yay! Go you!
      </CmTypography>
      <CmTypography variant="h3" style={{ textAlign: 'left' }}>
        How Did it go?
      </CmTypography>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <CmButton text="😡" onClick={() => submitRating(1)} style={{ backgroundColor: rating === 1 ? 'lightgray' : 'white' }} />
        <CmButton text="😐" onClick={() => submitRating(2)} style={{ backgroundColor: rating === 2 ? 'lightgray' : 'white' }} />
        <CmButton text="🤔" onClick={() => submitRating(3)} style={{ backgroundColor: rating === 3 ? 'lightgray' : 'white' }} />
        <CmButton text="😊" onClick={() => submitRating(4)} style={{ backgroundColor: rating === 4 ? 'lightgray' : 'white' }} />
        <CmButton text="🥳" onClick={() => submitRating(5)} style={{ backgroundColor: rating === 5 ? 'lightgray' : 'white' }} />
      </div>
    </>
  );
}

export default ConversationRating;
