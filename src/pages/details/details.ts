import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GitHubService } from '../../providers/github';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
  providers: [GitHubService]
})
export class DetailsPage {
  public readme = '';
  public repo;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private github: GitHubService,) {
    
    this.repo = navParams.get('repo');

    this.github.getDetails(this.repo).subscribe(
      data => this.readme = data.text(),
      err => {
        if(err.status == 404){
          this.readme = "Este repo no tiene readme. :(";
        } else{
          console.log(err);
        }
      },
      () => console.log("getDetails repo complete!")

    );

  }

}
