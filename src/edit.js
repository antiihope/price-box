import { useBlockProps, RichText } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import './editor.scss';
import { useSelect } from '@wordpress/data';
import SidePanelSettings from './sidePanel';
import { useEffect } from '@wordpress/element';

export default function Edit({ attributes, setAttributes, clientId }) {
  const { price, planName, benefits, discount, link, addedStyles, featured, featuredText, description, theme } = attributes;
  const { dottedList: dotted, alignList, alignPrice, planPlacement, borderRadius } = addedStyles;

  // get block attributes
  const blockAttrs = useSelect(
    (select) => {
      const { getBlockAttributes } = select('core/block-editor');
      const blockAttributes = getBlockAttributes(clientId);
      return blockAttributes;
    },
    [clientId]
  );
  // check if user set any type of custom coloring, this will then disable the block theme to use user's coloring
  const backgroundOrGradient = (() => {
    return (
      blockAttrs?.style?.color?.gradient || blockAttrs?.style?.color?.background || blockAttrs?.gradient || blockAttrs?.backgroundColor
    );
  })();

  const onChangePlanName = (newPlanName) => setAttributes({ planName: newPlanName });
  const onChangePrice = (newPrice) => setAttributes({ price: newPrice.replace('$', '') });
  const onChangeBenefits = (newBenefits) => setAttributes({ benefits: newBenefits });
  const onChangeDiscount = (newDiscount) => setAttributes({ discount: newDiscount.replace('$', '') });
  const onChangeFeaturedText = (newFeaturedText) => setAttributes({ featuredText: newFeaturedText });
  const onChangeDescription = (newDescription) => setAttributes({ description: newDescription });

  useEffect(() => {
    if (backgroundOrGradient) {
      setAttributes({ theme: 'user-defined-theme' });
    }
  }, [backgroundOrGradient]);
  return (
    <div
      {...useBlockProps({
        className: `border-${borderRadius}`,
      })}
    >
      <SidePanelSettings attributes={attributes} setAttributes={setAttributes} />
      <div className={`price-box-container ${featured ? 'featured-block' : backgroundOrGradient ? 'user-defined-theme' : theme}`}>
        {featured && (
          <div className="featured-tag">
            <RichText tagName="p" value={featuredText} onChange={onChangeFeaturedText} />
          </div>
        )}

        <>
          {planPlacement == 'top' ? (
            <>
              <RichText
                className="price-box-plan-name"
                tagName={addedStyles?.planNameTag || 'h1'}
                value={planName}
                onChange={onChangePlanName}
              />
              <div
                className="price-tag-wrapper"
                style={{
                  position: discount ? 'relative' : '',
                  right: discount ? '17px' : '0px',
                }}
              >
                {discount && <RichText className="price-tag-initial" tagName="p" value={`$${discount}`} onChange={onChangeDiscount} />}
                <RichText className="price-tag" tagName="h1" value={`$${price}`} onChange={onChangePrice} />
              </div>
            </>
          ) : (
            <>
              <div
                className="price-tag-wrapper"
                style={{
                  position: discount ? 'relative' : '',
                  right: discount ? '17px' : '0px',
                }}
              >
                {discount && <RichText className="price-tag-initial" tagName="p" value={`$${discount}`} onChange={onChangeDiscount} />}
                <RichText className="price-tag" tagName="h1" value={`$${price}`} onChange={onChangePrice} />
              </div>
              <RichText
                className="price-box-plan-name"
                tagName={addedStyles?.planNameTag || 'h1'}
                value={planName}
                onChange={onChangePlanName}
              />
            </>
          )}
        </>
        <RichText className="price-description" tagName="p" value={description} onChange={onChangeDescription} />
        {benefits && benefits.length > 0 && (
          <ul
            className="price-box-ul"
            style={{
              listStyle: dotted ? 'disc' : 'none',
              alignItems: alignList,
            }}
          >
            {benefits.map((benefit, i) => (
              <RichText
                tagName="li"
                value={benefit}
                onChange={(newBenefit) => {
                  // if empty, delete from array
                  if (!newBenefit) {
                    const newBenefits = [...benefits];
                    newBenefits.splice(i, 1);
                    onChangeBenefits(newBenefits);
                    return;
                  }
                  const newBenefits = [...benefits];
                  newBenefits[i] = newBenefit;
                  onChangeBenefits(newBenefits);
                }}
              />
            ))}
            {/* plus button that adds an element to the benifits */}
            <Button
              variant="link"
              onClick={() => {
                onChangeBenefits([...benefits, 'New Benefit']);
              }}
            >
              + Add Benefit
            </Button>
          </ul>
        )}
        <a href={link}>
          <button className="cta-button">Buy Now</button>
        </a>
      </div>
    </div>
  );
}
