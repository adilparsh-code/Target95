#!/usr/bin/env node
import { validateAcademicData } from '../src/lib/validation/academicDataValidator.mjs';

const outcome = await validateAcademicData(process.cwd());
console.log(outcome.report);

process.exit(outcome.exitCode);
