import { Component, OnInit, isDevMode } from "@angular/core";
import { ArticleService } from "src/app/providers/article.service";
import { Article } from "../../models/article";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ["title", "created_at", "delete"];
  dataSource: Article[] = [];

  constructor(private articleService: ArticleService) {}

  ngOnInit() {
    this.findAll();
  }

  findAll() {
    this.articleService.findAll().subscribe({
      next: (articleList: Article[]) => {
        this.dataSource = articleList.filter(
          article => article.title !== null || article.story_title !== null
        );
      },
      error: error => {
        if (isDevMode()) {
          console.log("Error findAll", error);
        }
      }
    });
  }

  openUrl(article: Article) {
    window.open(article.story_url || article.url, "_blank");
  }

  delete(id: string) {
    event.stopPropagation();
    this.articleService.delete(id).subscribe({
      next: () => {
        alert("Deleted!");
        this.dataSource = this.dataSource.filter(
          article => article.objectID !== id
        );
      },
      error: error => {
        if (isDevMode()) {
          console.log("Error delete", error);
        }
      }
    });
  }
}
