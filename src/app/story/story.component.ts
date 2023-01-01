import { Component } from '@angular/core';
import { tick } from '@angular/core/testing';
import { NgForm } from '@angular/forms';

import { StoryService } from '../shared/story.service';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css'],
  providers: [StoryService]
})
export class StoryComponent {

  storyLevel: string = "";
  storyStyle: string = "";
  storyTopic: string = "";
  storyLanguage: string = "";
  translationLanguage: string = "";
  story: any;
  generatedStory: any;
  translatedStory: any;
  storyLength: number = 0;
  newText: any;
  newConversation: string = "";
  translatedConversation: any;
  isConversationReady =  false;

  isTranslationReady = false;

  


  constructor(public storyService: StoryService) { 

   }

  makeRequest( form : NgForm ) {
    // Construct the request body
    const body = {
      model: "text-davinci-003",
      prompt: "Make a " + this.storyLevel + " " + this.storyStyle + " about " + this.storyTopic + " in " + this.storyLanguage + " language, and only of " + this.storyLength + " sentences.",
      temperature: 1,
      max_tokens: 150
    };

    // Make the post request to the ChatGPT API
    this.storyService.postStory(body).subscribe((res) => {
      console.log(body);
      console.log(res);
      this.story = res;
      this.generatedStory = this.story.choices[0].text;
      console.log(this.generatedStory);
      this.isTranslationReady = true;
      // this.story = this.generatedStory;
    }, error => {
      this.isTranslationReady = false;
    });
  }

  makeTranslation() {
    // Construct the request body
    const body = {
      model: "text-davinci-003",
      prompt: "Translate " + this.generatedStory + " in to " + this.translationLanguage,
      temperature: 1,
      max_tokens: 500
    };

    // Make the post request to the ChatGPT API
    this.storyService.postStory(body).subscribe((res) => {
      console.log(body);
      console.log(res);
      this.translatedStory = res;
    });
  }

  makeConversation() {
    // Construct the request body
    const body = {
      model: "text-davinci-003",
      prompt: "Make a " + this.storyLevel + " conversation about the following: " + this.generatedStory + ": in " + this.storyLanguage,
      temperature: 1,
      max_tokens: 500
    };

    // Make the post request to the ChatGPT API
    this.storyService.postStory(body).subscribe((res) => {
      console.log(body);
      console.log(res);
      this.newText = res;
      this.isConversationReady = true;
      // this.newConversation = this.newText.choice[0].text;
      // this.story = this.generatedStory;
    }, error => {
      this.isConversationReady = false;
    });
  }

  translateNewText() {
    // Construct the request body
    const body = {
      model: "text-davinci-003",
      prompt: "Translate " + this.newText.choices[0].text + " in to " + this.translationLanguage,
      temperature: 1,
      max_tokens: 500
    };

    // Make the post request to the ChatGPT API
    this.storyService.postStory(body).subscribe((res) => {
      console.log(body);
      console.log(res);      
      this.translatedConversation = res;
    });
  }

  practiceVocab() {
    const body = {
      model: "text-davinci-003",
      prompt: "Make another " + this.storyLevel + " " + this.storyStyle + "in only " + this.storyLength + " sentences, with only the following vocabulary: " + this.generatedStory + ": in " + this.storyLanguage,
      temperature: 1,
      max_tokens: 500
    };

    // Make the post request to the ChatGPT API
    this.storyService.postStory(body).subscribe((res) => {
      console.log(body);
      console.log(res);
      this.newText = res;
      this.isConversationReady = true;
      // this.newConversation = this.newText.choice[0].text;
      // this.story = this.generatedStory;
    }, error => {
      this.isConversationReady = false;
    });   
    

  }

  

  ngOnInit() {
    // Assume that the JSON object is stored in a variable called "jsonResponse"
    this.storyLevel = "very simple";
    this.storyStyle = "story";
    this.storyTopic = "everyday things";
    this.storyLanguage = "Lithuanian";
    this.storyLength = 3;
    this.translationLanguage = "English";
    
  }

  


}
