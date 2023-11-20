import { useBlockProps, RichText, InspectorControls, ColorPalette } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl } from '@wordpress/components';
import { Button } from '@wordpress/components';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
  const { price, planName, benefits, discount, link } = attributes;

  return (
    <div {...useBlockProps()}>
      <InspectorControls>
        <PanelBody title={'Price Box Settings'}>
          <TextControl label={'Plan Name'} value={planName} onChange={(newPlanName) => setAttributes({ planName: newPlanName })} />
          <TextControl label={'Price'} value={price} onChange={(newPrice) => setAttributes({ price: newPrice })} />
          <TextControl label={'Benefits'} value={benefits} onChange={(newBenefits) => setAttributes({ benefits: newBenefits })} />
          <TextControl label={'Discount'} value={discount} onChange={(newDiscount) => setAttributes({ discount: newDiscount })} />
          <TextControl label={'Link'} value={link} onChange={(newLink) => setAttributes({ link: newLink })} />
        </PanelBody>
      </InspectorControls>
      <div className="price-box-container">
        <RichText.Content tagName="h2" value={planName} />
        <div
          className="price-tag-wrapper"
          style={{
            right: discount ? '17px' : '0px',
            position: discount ? 'relative' : '',
          }}
        >
          {discount && <RichText.Content className="price-tag-initial" tagName="p" value={`$${discount}`} />}
          <RichText.Content className="price-tag" tagName="h1" value={`$${price}`} />
        </div>
        {benefits && benefits.length > 0 && (
          <ul className="price-box-ul">
            {benefits.map((benefit) => (
              <RichText.Content tagName="li" value={benefit} />
            ))}
          </ul>
        )}
        <a href={link}>
          <Button variant="secondary">Buy Now</Button>
        </a>
      </div>
    </div>
  );
}
