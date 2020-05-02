let CustomSelect = function (select) {

  this.select = select;
  this.nodeOption = this.select.find('option');
  this.wrapper = $('<div/>', {class: 'custom-select-wrapper'});
  this.customSelect = $('<div/>', {class: 'custom-select'});
  this.trigger = $('<div/>', {class: 'custom-select__trigger'});
  this.options = $('<div/>', {class: 'custom-select__options'});
  this.optionsInner = $('<div/>', {class: 'custom-select__options-inner'});
  this.placeholder = this.select.data('placeholder');


  this.trigger.on('click', this.handleTrigger.bind(this));
  $(document).mouseup(this.handleClickDocument.bind(this));


  this.createCustomSelect();
};

CustomSelect.prototype = {

  createCustomSelect: function () {

    this.select.wrap(this.wrapper);
    this.customSelect.append(this.trigger.text(this.placeholder));

    this.nodeWrap = this.select.parent('.custom-select-wrapper');

    this.nodeOption.each(function (index, elem) {
      let option = '<div class="custom-select__option" data-value="' + $(elem).attr('value') + '">' + $(elem).text() + '</div>';
      this.optionsInner.append(option);
    }.bind(this));

    this.options.append(this.optionsInner);
    this.customSelect.append(this.options);
    this.option = this.customSelect.find('.custom-select__option');

    this.option.on('click', this.handleOption.bind(this));

    this.select.after(this.customSelect);
  },

  handleTrigger: function () {
    if (this.trigger.hasClass('is-active')) {
      this.close();
    } else {
      this.show();
    }
  },

  close: function () {
    this.trigger.removeClass('is-active');
    this.options.hide();
  },

  show: function () {
    this.trigger.addClass('is-active');
    this.options.show();
  },

  handleOption: function (e) {
    this.select.val($(e.target).data('value'));
    this.trigger.text($(e.target).text());
    this.handleTrigger();
  },

  handleClickDocument: function (e) {
    if (!this.nodeWrap.is(e.target)
      && this.nodeWrap.has(e.target).length === 0) {
      this.close();
    }
  },


};

$('.select').each(function (index, elem) {
  new CustomSelect($(elem));
});









