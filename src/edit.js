import { useBlockProps, RichText, InspectorControls, ColorPalette } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl, ToggleControl } from '@wordpress/components';
import { Button } from '@wordpress/components';
import './editor.scss';
import { useState } from '@wordpress/element';
import SidePanelSettings from './sidePanel';
export default function Edit({ attributes, setAttributes }) {
  const { price, planName, benefits, discount, link, textStyles, featured, featuredText, description, theme } = attributes;

  const { dottedList: dotted, alignList, alignPrice, planPlacement } = textStyles;

  const onTextStyleChanges = (type, value) => {
    const newStyles = { ...textStyles, [type]: value };
    setAttributes({ textStyles: newStyles });
  };

  const onChangePlanName = (newPlanName) => setAttributes({ planName: newPlanName });
  const onChangePrice = (newPrice) => {
    setAttributes({ price: newPrice.replace('$', '') });
  };
  const onChangeBenefits = (newBenefits) => setAttributes({ benefits: newBenefits });
  const onChangeDiscount = (newDiscount) => {
    setAttributes({ discount: newDiscount.replace('$', '') });
  };
  const onChangeLink = (newLink) => setAttributes({ link: newLink });
  const onChangeFeaturedText = (newFeaturedText) => setAttributes({ featuredText: newFeaturedText });
  const onChangeDescription = (newDescription) => setAttributes({ description: newDescription });

  return (
    <div {...useBlockProps()}>
      <SidePanelSettings attributes={attributes} setAttributes={setAttributes} />
      <div className={`price-box-container ${featured ? 'featured-block' : theme}`}>
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
                tagName={textStyles?.planNameTag || 'h1'}
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
                tagName={textStyles?.planNameTag || 'h1'}
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
            {/* plugs button that adds an element to the benifits */}
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
          <Button variant="primary">Buy Now</Button>
        </a>
      </div>
    </div>
  );
}
