let StepForm = function (form) {

  this.form = form;
  this.prevStepBtn = this.form.find('#prev');
  this.nextStepBtn = this.form.find('#next');
  this.submitBtn = this.form.find('#submit');
  this.currentStep = 0;
  this.nodeStep = this.form.find('.form__fieldset');
  this.nodeProgressItems = this.form.find('#progress li');
  this.totalSteps = this.nodeStep.length - 1;

  this.init();
};

StepForm.prototype = {

  init: function () {
    this.showStep(this.currentStep);
    this.prevStepBtn.on('click', this.handlePrev.bind(this));
    this.nextStepBtn.on('click', this.handleNext.bind(this));
    this.nodeProgressItems.on('click', this.handlePoint.bind(this));
    this.form.submit(this.handleSubmit.bind(this));
  },

  formSend: function (formData) {
    // Таким способом только из-за поддержки IE и без дополнительных полифилов :(
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://www.mocky.io/v2/5dfcef48310000ee0ed2c281', true);
    xhr.send(formData);
    xhr.addEventListener('readystatechange', function (e) {
      if (xhr.readyState !== 4) return;
      if (xhr.status === 200) {
        let response = JSON.parse(xhr.response)
        if (response.status === 'error') {
          this.errorsParse(response.errors);
          this.toggleSubmitBtn();
        } else {
          alert('Registration success');
        }
      }
    }.bind(this));
  },

  setError: function (name, message) {
    this.form
      .find('[data-error=' + name + ']')
      .addClass('is-active')
      .text(message);
  },

  errorsParse: function (errors) {
    let firstErrorName = errors[0].name;
    let firstErrorIndex = this.form
      .find('[data-error=' + firstErrorName + ']')
      .index();
    errors.forEach(function (item) {
      this.setError(item.name, item.message)
    }.bind(this));
    this.showStep(firstErrorIndex);
  },

  clearErrors: function () {
    this.form
      .find('.form__error')
      .removeClass('is-active');
  },

  toggleSubmitBtn: function () {
    if (this.submitBtn.hasClass('in-process')) {
      this.submitBtn.text('Start now');
      this.submitBtn.removeClass('in-process');
    } else {
      this.submitBtn.text('Sending');
      this.submitBtn.addClass('in-process');
    }
  },

  handleSubmit: function (e) {
    e.preventDefault();
    this.clearErrors();
    this.recalculateHeightForStep(this.totalSteps);
    let data = this.form.serializeArray();
    this.toggleSubmitBtn();
    // Синтетическая задержка
    setTimeout(this.formSend.bind(this, data), 2000);
    return false;
  },

  recalculateHeightForStep: function (step) {
    let stepHeight = this.nodeStep.eq(step).outerHeight();
    this.setFormHeight(stepHeight);
  },

  hideToggleButtons: function (step) {
    if (this.totalSteps === step) {
      this.submitBtn.show();
      this.nextStepBtn.hide();
    } else {
      this.submitBtn.hide();
      this.nextStepBtn.show();
    }

    if (step === 0) {
      this.prevStepBtn.hide();
    } else {
      this.prevStepBtn.show();
    }
  },

  showStep: function (step) {
    if (this.totalSteps >= step && step >= 0) {

      this.setCurrentStep(step);
      this.nodeStep.removeClass('is-active');
      this.nodeStep
        .eq(step)
        .addClass('is-active');

      this.hideToggleButtons(step);

      this.recalculateHeightForStep(step);
      this.setProgress(step);
    }

  },

  setProgress: function (step) {
    this.nodeProgressItems.removeClass('is-active');
    this.nodeProgressItems.each(function (index, elem) {
      if (index <= step) {
        $(elem).addClass('is-active');
      }
    });
  },

  setFormHeight: function (height) {
    this.form.height(height);
  },

  setCurrentStep: function (step) {
    this.currentStep = step;
  },

  handlePoint: function (e) {
    let step = $(e.target).index();
    this.showStep(step);
  },

  handlePrev: function () {
    this.showStep(this.currentStep - 1);
  },

  handleNext: function () {
    this.showStep(this.currentStep + 1);
  },

};


new StepForm($('#form'));
