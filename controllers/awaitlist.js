const Awaitlist = require('../models/awaitlist');

async function create(req, res, next) {
  try {
    const { member, movie } = req.body;
    const awaitlist = new Awaitlist({ _member: member, _movie: movie });
    const savedAwaitlist = await awaitlist.save();
    res.status(201).json({ message: 'Registro en la lista de espera creado con éxito', awaitlist: savedAwaitlist });
  } catch (error) {
    next(error);
  }
}

function list(req, res, next) {
    Awaitlist.find()
        .populate('_member')
        .populate('_movie')
        .then(objs => res.status(200).json({
            msg: "Await list",
            obj: objs
        }))
        .catch(ex => res.status(500).json({
            msg: "Error listing Await list",
            obj: ex
        }));
}

async function index(req, res, next) {
  try {
    const awaitlistId = req.params.id;
    const awaitlistItem = await Awaitlist.findById(awaitlistId).populate(['_member', '_movie']);

    if (!awaitlistItem) {
      return res.status(404).json({ message: 'Elemento de lista de espera no encontrado', awaitlist: null });
    }

    res.status(200).json({ message: 'Detalle de elemento de lista de espera', awaitlist: awaitlistItem });
  } catch (error) {
    next(error);
  }
}

async function replace(req, res, next) {
  try {
    const awaitlistId = req.params.id;
    const { member, movie } = req.body;

    const updatedAwaitlist = await Awaitlist.findByIdAndUpdate(
      awaitlistId,
      { _member: member, _movie: movie },
      { new: true }
    ).populate(['_member', '_movie']);

    if (!updatedAwaitlist) {
      return res.status(404).json({ message: 'Elemento de lista de espera no encontrado', awaitlist: null });
    }

    res.status(200).json({ message: 'Elemento de lista de espera reemplazado correctamente', awaitlist: updatedAwaitlist });
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    const awaitlistId = req.params.id;
    const { member, movie } = req.body;

    const updatedFields = {};

    if (member) {
      updatedFields._member = member;
    }

    if (movie) {
      updatedFields._movie = movie;
    }

    const updatedAwaitlist = await Awaitlist.findByIdAndUpdate(
      awaitlistId,
      updatedFields,
      { new: true }
    ).populate(['_member', '_movie']);

    if (!updatedAwaitlist) {
      return res.status(404).json({ message: 'Elemento de lista de espera no fue encontrado', awaitlist: null });
    }

    res.status(200).json({ message: 'Elemento de lista de espera actualizado correctamente', awaitlist: updatedAwaitlist });
  } catch (error) {
    next(error);
  }
}

async function destroy(req, res, next) {
  try {
    const awaitlistId = req.params.id;
    const deletedAwaitlist = await Awaitlist.findByIdAndRemove(awaitlistId);

    if (!deletedAwaitlist) {
      return res.status(404).json({ message: 'Elemento de lista de espera no encontrado', awaitlist: null });
    }

    res.status(200).json({ message: 'Elemento de lista de espera eliminado correctamente', awaitlist: deletedAwaitlist });
  } catch (error) {
    next(error);
  }
}


module.exports = {
    create,
    list,
    index,
    replace,
    update,
    destroy,
  };