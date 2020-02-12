const labels = [
    { id: 'to-watch', name: 'Para assistir' },
    { id: 'watching', name: 'Assistindo' },
    { id: 'watched', name: 'Assistido' }
];

/** series home */

const index = async ({ Serie }, req, res) => {
    const docs = await Serie.find({})
    res.render('series/index', { series: docs, labels });
}

/** end series home */

/** create  */

const novaForm = (req, res) => {
    res.render('series/nova', { errors: [] });
}

const novaProcess = async ({ Serie }, req, res) => {
    const serie = new Serie(req.body);
    try {
        await serie.save();
        res.redirect('/series');
    } catch (e) {
        res.render('series/nova', {
            errors: Object.keys(e.errors)
        });
    }
}

/** and create  */

/** edit */

const editarForm = async ({ Serie }, req, res) => {
    const serie = await Serie.findOne({ _id: req.params.id });
    res.render('series/editar', { serie, labels, errors: [] });
}

const editarProcess = async ({ Serie }, req, res) => {
    const serie = await Serie.findOne({ _id: req.params.id })
    serie.name = req.body.name
    serie.status = req.body.status
    try {
        await serie.save();
        res.redirect('/series');
    } catch (e) {
        res.render('series/editar', { serie, labels, errors: Object.keys(e.errors) });
    }
}

/** end edit */

/** delete */

const excluir = async ({ Serie }, req, res) => {
    await Serie.deleteOne({ _id: req.params.id });
    res.redirect('/series');
}

/** end delete */

/** info series */

const info = async ({ Serie }, req, res) => {
    const serie = await Serie.findOne({ _id: req.params.id })
    res.render('series/info', { serie });
}

const addComentario = async ({ Serie }, req, res) => {
    await Serie.updateOne({ _id: req.params.id }, { $push: { comments: req.body.comentario } })
    res.redirect('/series/info/' + req.params.id);
}

/** end info series */

module.exports = {
    index,
    novaForm,
    novaProcess,
    editarForm,
    editarProcess,
    info,
    addComentario,
    excluir
}
