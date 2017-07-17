import { StorageExperimentPage } from './app.po';

describe('storage-experiment App', () => {
  let page: StorageExperimentPage;

  beforeEach(() => {
    page = new StorageExperimentPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
