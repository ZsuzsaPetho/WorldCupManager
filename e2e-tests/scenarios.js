'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /team when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/team");
  });


  describe('team', function() {

    beforeEach(function() {
      browser.get('index.html#!/team');
    });


    it('should render team when user navigates to /team', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 1/);
    });

  });


  describe('detailed', function() {

    beforeEach(function() {
      browser.get('index.html#!/detailed');
    });


    it('should render detailed when user navigates to /detailed', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 2/);
    });

  });
});
