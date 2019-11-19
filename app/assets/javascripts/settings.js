function confirmDeleteAllData () {
  var buttons = [
    {
      text: 'No',
      style: 'neutral',
      action: function () {
        // Do nothing...
      }
    },
    {
      text: 'Yes, proceed',
      style: 'danger',
      action: function () {
        document.getElementById("delete-blog-form").submit()
      }
    }
  ]

  var confirmation = new Stylekit.SKAlert({
    title: 'Attention!',
    text:
      'Are you sure you want to permanently delete your Listed blog and all associated posts? Note that this will not affect any of the source notes in your Standard Notes account.',
    buttons
  })

  confirmation.present()
}
