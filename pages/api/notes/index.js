import { apiHandler, notesRepo, omit } from 'helpers/api';

export default apiHandler({
    get: getNotes
});

function getNotes(req, res) {
    const response = notesRepo.getAll().map(x => omit(x, 'hash'));
    return res.status(200).json(response);
}
