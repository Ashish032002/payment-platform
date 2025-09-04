{{/* Expand the name of the chart */}}
{{- define "helm.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/* Create a default fully qualified app name */}}
{{- define "helm.fullname" -}}
{{- if .Values.fullnameOverride -}}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- $name := default .Chart.Name .Values.nameOverride -}}
{{- if contains $name .Release.Name -}}
{{- .Release.Name | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" -}}
{{- end -}}
{{- end -}}
{{- end -}}

{{/* Chart name and version used by the chart label */}}
{{- define "helm.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" -}}
{{- end -}}

{{/* Common labels */}}
{{- define "helm.labels" -}}
helm.sh/chart: {{ include "helm.chart" . }}
{{ include "helm.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end -}}

{{/* Selector labels */}}
{{- define "helm.selectorLabels" -}}
app.kubernetes.io/name: {{ include "helm.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end -}}

{{/* ServiceAccount name */}}
{{- define "helm.serviceAccountName" -}}
{{- if .Values.serviceAccount.create -}}
{{- default (include "helm.fullname" .) .Values.serviceAccount.name -}}
{{- else -}}
{{- default "default" .Values.serviceAccount.name -}}
{{- end -}}
{{- end -}}

{{/* ---- Aliases so templates can use payment-gateway-pro.* ---- */}}
{{- define "payment-gateway-pro.name" -}}{{ include "helm.name" . }}{{- end -}}
{{- define "payment-gateway-pro.fullname" -}}{{ include "helm.fullname" . }}{{- end -}}
{{- define "payment-gateway-pro.chart" -}}{{ include "helm.chart" . }}{{- end -}}
{{- define "payment-gateway-pro.labels" -}}{{ include "helm.labels" . }}{{- end -}}
{{- define "payment-gateway-pro.selectorLabels" -}}{{ include "helm.selectorLabels" . }}{{- end -}}
{{- define "payment-gateway-pro.serviceAccountName" -}}{{ include "helm.serviceAccountName" . }}{{- end -}}

