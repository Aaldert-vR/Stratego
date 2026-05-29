#include <stdio.h>
#include <string.h>
FILE* txt;
char command[1000];
char argument[100];
char space[]={' ', "\0"};
int main(int argc, char *argv[]){
    txt = fopen("npm.txt","r");
    fgets(command, 100, txt);
    for (int i=1; i<argc; i++){
        strcat(command, space);
        strcat(command, argv[i]);
    }
    system(command);
    return 0;
}