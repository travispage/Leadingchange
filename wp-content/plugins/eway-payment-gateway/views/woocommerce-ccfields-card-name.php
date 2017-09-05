<?php
if (!defined('ABSPATH')) {
	exit;
}
?>

<p class="form-row form-row-wide">
	<label for="<?php echo esc_attr($this->id); ?>-card-name"><?php esc_html_e("Card Holder's Name", 'eway-payment-gateway'); ?> <span class="required">*</span></label>
	<input id="<?php echo esc_attr($this->id); ?>-card-name" class="input-text wc-credit-card-form-card-name" type="text" maxlength="50" name="<?php echo esc_attr($this->id); ?>-card-name"
		autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" />
</p>
