// CONTROLLER : traduit les actions de la vue en opérations sur le modèle.
export class TodoController {
  #filtre = 'toutes';

  constructor(model, view) {
    this.model = model;
    this.view = view;
    view.bindAdd(title => {
      try {
        model.add(title);
        view.showError('');
      } catch (e) {
        view.showError(e.message);
      }
    });
    view.bindToggle(id => model.toggle(id));
    view.bindRemove(id => model.remove(id));
    view.bindFilter(nom => {
      this.#filtre = nom;
      this.#afficher();
    });
    model.subscribe(() => this.#afficher());
  }
  #afficher() {
    this.view.render(this.model.filtrer(this.#filtre), this.model.restantes());
    this.view.showFiltre(this.#filtre);
  }
}
