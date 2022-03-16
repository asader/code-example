import { makeRequest } from '../../makeRequest';

import { API } from '../../../constants/api';

import { IBlog } from '../../../definitions/entity';

export const reqWysiwygSave = () => makeRequest<IBlog>({
  url: API.WYSIWYG.SAVE(),
});
