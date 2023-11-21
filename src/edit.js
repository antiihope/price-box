import { useBlockProps, RichText, InspectorControls, ColorPalette } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl, ToggleControl } from '@wordpress/components';
import { Button } from '@wordpress/components';
import './editor.scss';
import { useState } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
  const { price, planName, benefits, discount, link, textStyles, featured, featuredText, description } = attributes;

  const doted = textStyles?.dottedList;
  const alignList = textStyles?.alignList;
  const alignPrice = textStyles?.alignPrice;
  const [showTestPanel, setShowTestPanel] = useState(false);

  const onTextStyleChanges = (type, value) => {
    const newStyles = { ...textStyles, [type]: value };
    setAttributes({ textStyles: newStyles });
  };

  const PlanNameSetting = () => {
    return (
      <PanelBody title={'Plan Name Typography'}>
        <SelectControl
          label={'Font size'}
          value={textStyles?.planNameTag}
          options={[
            { label: 'Large', value: 'h1' },
            { label: 'Medium', value: 'h2' },
            { label: 'Small', value: 'h3' },
          ]}
          onChange={(newSize) => {
            onTextStyleChanges('planNameTag', newSize);
          }}
        />
      </PanelBody>
    );
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

  const PlanAndPriceTag = ({ place }) => {
    return (
      <>
        {place == 'top' ? (
          <>
            <RichText
              className="price-box-plan-name"
              tagName={textStyles?.planNameTag || 'h1'}
              value={planName}
              onClick={() => {
                setShowTestPanel(!showTestPanel);
              }}
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
              onClick={() => {
                setShowTestPanel(!showTestPanel);
              }}
              onChange={onChangePlanName}
            />
          </>
        )}
      </>
    );
  };
  return (
    <div {...useBlockProps()}>
      <InspectorControls>
        {showTestPanel && <PlanNameSetting />}

        <PanelBody title={'Price Box Settings'}>
          <ToggleControl label={'Featured'} checked={featured} onChange={(newfeatured) => setAttributes({ featured: newfeatured })} />
          {featured && (
            <TextControl
              label={'Featured Text'}
              value={featuredText}
              onChange={(newFeaturedText) => setAttributes({ featuredText: newFeaturedText })}
            />
          )}

          <TextControl label={'Plan Name'} value={planName} onChange={onChangePlanName} />
          <SelectControl
            label={'Plan Placement'}
            value={textStyles?.planPlacement}
            options={[
              { label: 'top', value: 'top' },
              { label: 'bottom', value: 'bottom' },
            ]}
            onChange={(newAlignList) => onTextStyleChanges('planPlacement', newAlignList)}
          />
          <TextControl label={'Price'} value={price} onChange={onChangePrice} />
          <TextControl label={'Benefits'} value={benefits} onChange={onChangeBenefits} />
          <TextControl label={'Discount'} value={discount} onChange={onChangeDiscount} />
          <TextControl label={'Link'} value={link} onChange={onChangeLink} />

          <ToggleControl
            label={'Dotted List'}
            checked={doted}
            onChange={(newDottedList) => onTextStyleChanges('dottedList', newDottedList)}
          />

          <SelectControl
            label={'Align List'}
            value={alignList}
            options={[
              { label: 'Left', value: 'flex-start' },
              { label: 'Center', value: 'center' },
              { label: 'Right', value: 'flex-end' },
            ]}
            onChange={(newAlignList) => onTextStyleChanges('alignList', newAlignList)}
          />
        </PanelBody>
      </InspectorControls>

      <div className={`price-box-container ${featured ? 'featured-block' : 'easy-theme'}`}>
        {featured && (
          <div className="featured-tag">
            <RichText tagName="p" value={featuredText} onChange={onChangeFeaturedText} />
          </div>
        )}

        <PlanAndPriceTag place={textStyles?.planPlacement} />
        <RichText className="price-description" tagName="p" value={description} onChange={onChangeDescription} />
        {benefits && benefits.length > 0 && (
          <ul
            className="price-box-ul"
            style={{
              listStyle: doted ? 'disc' : 'none',
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
