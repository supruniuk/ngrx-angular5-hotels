import 'jest-preset-angular';
import { MatCommonModule } from '@angular/material';

global['CSS'] = null;
MatCommonModule.prototype['_checkDoctype'] = function() {};
MatCommonModule.prototype['_checkTheme'] = function() {};