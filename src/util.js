exports.install = function(Vue, options) {
  Vue.prototype._loading = function(text) {
    this.showLoading = this.$createToast({
      time: 0,
      txt: text || " ",
      mask: true
    }).show()
  }

  Vue.prototype._hide = function(text) {
    this.showLoading.hide()
  }

  Vue.prototype._Toast = function(type, text, time, mask) {
    if (type === 'success') { type = 'correct' }
    this._showToast = this.$createToast({
      type: type || 'loading',
      time: 2000 || time,
      txt: text,
      mask: mask
    }).show()
  }

  Vue.prototype._Modal = function(text, title) {
    this.$createDialog({
      type: 'alert',
      icon: 'cubeic-alert',
      showClose: true,
      title: title || '提示',
      content: text || ' '
    }).show()
  }

  Vue.prototype._back = function(type) {
    this.$router.push({
      path: '/' + type
    })
  }
}
