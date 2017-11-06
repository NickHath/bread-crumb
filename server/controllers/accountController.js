module.exports = {
  getAccounts: function(req, res) {
    const db = req.app.get('db');
    db.accounts.get_accounts()
      .then(accounts => res.status(200).send(accounts))
      .catch(err => res.status(500).send(err));
  },


  getAccount: function(req, res) {
    const db = req.app.get('db');
    db.accounts.get_account_by_id([req.user.account_id])
      .then(account => res.status(200).send(account))
      .catch(err => res.status(500).send(err));
  },


  editAccount: function(req, res) {
    const db = req.app.get('db');
    const { first_name, last_name, email } = req.body;
    db.accounts.edit_account([req.user.account_id, first_name, last_name, email])
      .then(() => res.status(200).send(`Edited account ${req.params.id}`))
      .catch(err => res.status(500).send(err));
  },


  deleteAccount: function(req, res) {
    const db = req.app.get('db');
    db.accounts.delete_account([req.params.id])
      .then(() => res.status(200).send(`Deleted account ${req.params.id}`))
      .catch(err => res.status(500).send(err));
  }
}