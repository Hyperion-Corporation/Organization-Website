{{- define "organization-website.name" -}}
{{- .Chart.Name -}}
{{- end -}}

{{- define "organization-website.labels" -}}
app: {{ include "organization-website.name" . }}
{{- end -}}
