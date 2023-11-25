import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl, ToggleControl, RangeControl } from '@wordpress/components';

const SidePanelSettings = ({ attributes, setAttributes }) => {
  const { price, planName, benefits, discount, link, addedStyles, featured, featuredText, description, theme } = attributes;
  const { dottedList: dotted, alignList, alignPrice, planPlacement, borderRadius, boxShadow } = addedStyles;

  const onTextStyleChanges = (type, value) => {
    const newStyles = { ...addedStyles, [type]: value };
    setAttributes({ addedStyles: newStyles });
  };

  const onChangePlanName = (newPlanName) => setAttributes({ planName: newPlanName });
  const onChangePrice = (newPrice) => setAttributes({ price: newPrice.replace('$', '') });
  const onChangeBenefits = (newBenefits) => setAttributes({ benefits: newBenefits });
  const onChangeDiscount = (newDiscount) => setAttributes({ discount: newDiscount.replace('$', '') });
  const onChangeLink = (newLink) => setAttributes({ link: newLink });
  const onChangeDescription = (newDescription) => setAttributes({ description: newDescription });
  const onThemeChange = (newTheme) => setAttributes({ theme: newTheme });

  return (
    <InspectorControls>
      <PanelBody title={'Plan Name Typography'}>
        <SelectControl
          label={'Font size'}
          value={addedStyles?.planNameTag}
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

      <PanelBody title={'Price Box Settings'}>
        <ToggleControl label={'Featured'} checked={featured} onChange={(newfeatured) => setAttributes({ featured: newfeatured })} />
        {featured && (
          <TextControl
            label={'Featured Text'}
            value={featuredText}
            onChange={(newFeaturedText) => setAttributes({ featuredText: newFeaturedText })}
          />
        )}

        <SelectControl
          label={'theme'}
          value={theme}
          options={[
            { label: 'Default', value: '' },
            { label: 'Spacy', value: 'spacy-theme' },
            { label: 'Light', value: 'light-theme' },
            { label: 'Easy', value: 'easy-theme' },
          ]}
          onChange={onThemeChange}
        />
        <TextControl label={'Plan Name'} value={planName} onChange={onChangePlanName} />
        <SelectControl
          label={'Plan Placement'}
          value={addedStyles?.planPlacement}
          options={[
            { label: 'top', value: 'top' },
            { label: 'bottom', value: 'bottom' },
          ]}
          onChange={(newAlignList) => onTextStyleChanges('planPlacement', newAlignList)}
        />
        <TextControl label={'Descriptin'} value={description} onChange={onChangeDescription} />
        <TextControl label={'Price'} value={price} onChange={onChangePrice} />
        <TextControl label={'Benefits'} value={benefits} onChange={onChangeBenefits} />
        <TextControl label={'Discount'} value={discount} onChange={onChangeDiscount} />
        <TextControl label={'Link'} value={link} onChange={onChangeLink} />

        <ToggleControl
          label={'Dotted List'}
          checked={dotted}
          onChange={(newDottedList) => onTextStyleChanges('dottedList', newDottedList)}
        />
        <RangeControl
          min={0}
          max={25}
          value={borderRadius}
          label="Round corners"
          onChange={(value) => {
            onTextStyleChanges('borderRadius', value);
          }}
        />
        <RangeControl
          min={0}
          max={25}
          value={boxShadow}
          label="Shadow"
          onChange={(value) => {
            onTextStyleChanges('boxShadow', value);
          }}
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
  );
};

export default SidePanelSettings;
