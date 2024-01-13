import { capitalizeFirstLetter } from "helpers/capitalizeFirstLetter";
import { CmButton, CmCard, CmChip, CmTypography } from "shared/components";
import { ActionCardHeader } from "shared/components";

interface Props {
  effectId: string;
  preTitle?: string;
  effectTitle: string;
  effectShortDescription: string;
  imageUrl: string;
  effectSolutions: { solutionTitle: string, solutionType: string }[];
  relatedPersonalValues?: string[];
  onLearnMore: (effectId: string) => void;
}

function ClimateFeedCard({ effectId, preTitle, effectTitle, effectShortDescription, imageUrl, effectSolutions, relatedPersonalValues, onLearnMore }: Props) {
  return (
    <CmCard>
      {preTitle && <CmTypography variant='label' style={styles.preTitle}>{preTitle}</CmTypography>}
      <CmTypography variant='h3' style={styles.title}>{capitalizeFirstLetter(effectTitle)}</CmTypography>

      {imageUrl && <img src={imageUrl} alt={effectTitle} style={styles.image} />}

      <CmTypography variant='body' style={styles.description}>{effectShortDescription}</CmTypography>

      <div style={{ paddingLeft: 20 }}>
        {relatedPersonalValues?.map((value: string) => (
          <CmChip text={value} key={value} style={{ marginRight: 5 }} />
        ))}
      </div>

      <CmButton variant='text' text='Learn more' style={styles.learnMore} onClick={() => onLearnMore(effectId)} />

      {effectSolutions.length > 0 && <ActionCardHeader {...effectSolutions[0]} />}
    </CmCard>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  preTitle: {
    marginTop: 20,
    marginBottom: -20,
    paddingLeft: 20,
    fontSize: 10,
  },
  title: {
    textAlign: 'left',
    paddingLeft: 20,
    paddingRight: 20,
  },
  image: {
    width: '100%',
    maxHeight: 360,
    objectFit: 'cover',
  },
  description: {
    padding: 20,
  },
  learnMore: {
    alignSelf: 'flex-start',
    margin: 20,
    marginLeft: 20,
  },
};

export default ClimateFeedCard;
