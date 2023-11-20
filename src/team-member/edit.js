import { useBlockProps, RichText, InspectorControls, ColorPalette } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
  const { price, planName, benefits, discount, link } = attributes;

  return (
    <div {...useBlockProps()}>
      <InspectorControls>
        <PanelBody title={__('Price Box Settings', 'price-box')}>
          <TextControl
            label={__('Plan Name', 'price-box')}
            value={planName}
            onChange={(newPlanName) => setAttributes({ planName: newPlanName })}
          />
          <TextControl label={__('Price', 'price-box')} value={price} onChange={(newPrice) => setAttributes({ price: newPrice })} />
          <TextControl
            label={__('Benefits', 'price-box')}
            value={benefits}
            onChange={(newBenefits) => setAttributes({ benefits: newBenefits })}
          />
          <TextControl
            label={__('Discount', 'price-box')}
            value={discount}
            onChange={(newDiscount) => setAttributes({ discount: newDiscount })}
          />
          <TextControl label={__('Link', 'price-box')} value={link} onChange={(newLink) => setAttributes({ link: newLink })} />
        </PanelBody>
      </InspectorControls>
      <div className="price-box">
        <RichText.Content tagName="h2" value={planName} />
        <RichText.Content tagName="p" value={price} />
        <RichText.Content tagName="p" value={benefits} />
        <RichText.Content tagName="p" value={discount} />
        <a href={link}>Buy Now</a>
      </div>
    </div>
  );
}
